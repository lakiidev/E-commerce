import { FC } from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import LoginForm from "../components/Authentication/LoginForm";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
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
