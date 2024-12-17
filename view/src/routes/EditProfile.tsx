import { FC, useEffect } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { profileSchema } from "../validations/profile";
import { updateProfile } from "../store/userSlice/userSlice";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

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
    formState: { isDirty, errors },
  } = useForm<ProfileData>({ resolver: zodResolver(profileSchema) });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<ProfileData> = async (data) => {
    try {
      if (user) {
        const updatedFields: Partial<ProfileData> = {};
        Object.keys(data).forEach((key) => {
          if (
            data[key as keyof ProfileData] !== user[key as keyof typeof user]
          ) {
            updatedFields[key as keyof ProfileData] =
              data[key as keyof ProfileData];
          }
        });
        await dispatch(updateProfile(updatedFields)).unwrap();
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error || "An error occurred");
    }
  };

  const inputStyle =
    "p-5 rounded-3xl focus:outline-zinc-400 active:ring-zinc-400 w-full disabled:bg-gray-200";

  return (
    <Container>
      <h1 className="mt-20 text-[9rem] font-bold uppercase tracking-tighter leading-none">
        Edit profile
      </h1>
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
          disabled={!isDirty}
        >
          Save Changes
        </button>
      </form>
    </Container>
  );
};

export default EditProfile;
