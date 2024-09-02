import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { Link } from "react-router-dom";
import { registerSchema } from "../../validations/register";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface RegisterFormProps {}
type RegisterData = z.infer<typeof registerSchema>;

const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const inputClassName =
    "bg-[#f2f2efe0] placeholder:text-black placeholder:font-bold px-12 py-7 rounded-[40px] ";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterData) =>
      axios.post("http://localhost:3000/api/auth/register", {
        email: data.email,
        password: data.password,
      }),
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        toast.error(errorMessage);
      } else {
        toast.error(error.message);
      }
    },
  });
  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      className="flex flex-col gap-5 text-4xl mt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder="Email"
        type="email"
        id="email"
        className={inputClassName}
        {...register("email", { required: true })}
      />
      <input
        placeholder="Password"
        type="password"
        id="password"
        className={inputClassName}
        {...register("password", { required: true })}
      />
      <input
        placeholder="Repeat Password"
        type="password"
        id="confirmPassword"
        className={inputClassName}
        {...register("confirmPassword", { required: true })}
      />
      <p className="font-normal flex gap-2 text-2xl mt-5">
        Already have an account?
        <Link
          className="underline font-semibold text-[#01E3EB] hover:text-[#01E3EB] cursor-pointer"
          to="/login"
        >
          Login
        </Link>
      </p>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="w-fit px-5 py-4 bg-[#01E3EB] rounded-3xl text-2xl font-semibold"
        >
          Register
        </button>
        <ul className="text-xl text-red-900 font-bold">
          {Object.values(errors).map((error) => (
            <li>{error.message}</li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default RegisterForm;
