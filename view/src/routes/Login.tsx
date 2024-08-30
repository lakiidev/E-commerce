import { FC } from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import LoginForm from "../components/Authentication/LoginForm";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#FFFAF0] bg-[linear-gradient(to_right,#b4b4b4_0.3px,transparent_1px),linear-gradient(to_bottom,#b4b4b4_0.3px,transparent_1px)] bg-[size:144px_144px]"></div>
      <Navbar />
      <Container className="h-full">
        <div className="h-full flex flex-col justify-start items-start">
          <h1 className="text-[10rem] font-bold">Login</h1>
          <LoginForm />
        </div>
      </Container>
    </div>
  );
};

export default Login;
