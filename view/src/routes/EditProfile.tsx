import { FC, useEffect } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { profileSchema } from "../validations/profile";
import { updateProfile, logoutUser } from "../store/userSlice/userSlice";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditErrorPayload } from "../store/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
interface EditProfileProps {}

type ProfileData = z.infer<typeof profileSchema>;

const EditProfile: FC<EditProfileProps> = ({}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { isDirty, errors },
  } = useForm<ProfileData>({ resolver: zodResolver(profileSchema) });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      });
    }
  }, [user, reset]);

  const emailChanged = watch("email") !== user?.email;
  const passwordChanged = watch("oldPassword");
  const newPasswordChanged = watch("newPassword");

  const onSubmit: SubmitHandler<ProfileData> = async (data) => {
    try {
      if (user) {
        if (emailChanged && !passwordChanged) {
          throw new Error(
            "You must provide your old password to change your email."
          );
        } else if (!emailChanged && passwordChanged && !newPasswordChanged) {
          setError("oldPassword", {
            type: "manual",
            message:
              "You must provide your new password to change your password.",
          });
          return;
        } else {
          const updatedFields: Partial<ProfileData> = {};

          (Object.keys(data) as (keyof ProfileData)[]).forEach((key) => {
            const value = data[key];
            if (
              key === "oldPassword" || key === "newPassword"
                ? value && value.trim() !== ""
                : value !== user[key as keyof typeof user] && value !== null
            ) {
              updatedFields[key] = value;
            }
          });
          if (Object.keys(updatedFields).length === 0) {
            toast.info("No changes made to the profile.");
            return;
          }
          await dispatch(updateProfile(updatedFields)).unwrap();
          toast.success("Profile updated successfully");
        }
      }
    } catch (error) {
      const errorMessage = error as EditErrorPayload;
      toast.error((error as string) || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      const errorMessage = error as EditErrorPayload;
      toast.error(errorMessage.message || "Failed to log out");
    }
  };
  const inputStyle =
    "mt-2 p-5 rounded-3xl focus:outline-zinc-400 bg-zinc-100 active:ring-zinc-400 w-full disabled:bg-gray-200";

  return (
    <Container>
      <div className="mt-20 flex gap-10 items-center">
        <h1 className="text-[9rem] font-bold uppercase tracking-tighter leading-none">
          Edit profile
        </h1>
        <button
          className="bg-transparent px-10 border-0 h-fit text-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-20 w-1/2 text-3xl items-start"
      >
        <div className="flex gap-20">
          <div className="flex flex-col">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              defaultValue={watch("firstName") || user?.firstname}
              placeholder="First Name"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              defaultValue={watch("lastName") || user?.lastname}
              placeholder="Last Name"
              className={inputStyle}
            />
          </div>
        </div>

        <input
          type="email"
          id="email"
          {...register("email")}
          defaultValue={watch("email") || user?.email}
          placeholder="Email"
          className={inputStyle}
        />
        <h3>Reset Password</h3>
        <div className="flex gap-10">
          <input
            type="password"
            placeholder="Old Password"
            className={inputStyle}
            id="oldPassword"
            {...register("oldPassword")}
          />
          <input
            type="password"
            placeholder="New Password"
            className={inputStyle}
            id="newPassword"
            {...register("newPassword")}
            onChange={(e) => {
              register("oldPassword").onChange(e);
              clearErrors("oldPassword");
            }}
          />
        </div>
        <p className="text-red-500 text-lg">
          {Object.values(errors).map((error) => (
            <li key={error.message}>{error.message}</li>
          ))}
        </p>
        <button
          type="submit"
          className="mt-10 bg-[#01E3EB] px-5 py-2 rounded-3xl uppercase text-2xl font-bold disabled:opacity-50"
          disabled={!isDirty || Object.keys(errors).length > 0}
        >
          Save Changes
        </button>
      </form>
    </Container>
  );
};

export default EditProfile;
