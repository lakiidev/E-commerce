import { FC } from "react";
import { Link } from "react-router-dom";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const inputClassName =
    "bg-[#f2f2efe0] placeholder:text-black placeholder:font-bold px-12 py-7 rounded-[40px] ";

  return (
    <form className="flex flex-col gap-5 text-4xl mt-10">
      <input
        placeholder="Email"
        type="email"
        id="email"
        className={inputClassName}
      />
      <input
        placeholder="Password"
        type="password"
        id="password"
        className={inputClassName}
      />
      <p className="font-normal flex gap-2 text-2xl mt-5">
        First time here?
        <Link
          className="underline font-semibold text-[#01E3EB] hover:text-[#01E3EB] cursor-pointer"
          to="/register"
        >
          Register
        </Link>
      </p>
      <button
        type="submit"
        className="w-fit px-5 py-4 bg-[#01E3EB] rounded-3xl text-2xl font-semibold"
      >
        Register
      </button>
    </form>
  );
};

export default LoginForm;
