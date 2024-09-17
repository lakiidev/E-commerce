import { FC } from "react";
import Container from "../components/Container";
import RegisterForm from "../components/Authentication/RegisterForm";
import Navbar from "../components/Navbar";

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <Container className="h-full">
        <div className="h-full flex flex-col justify-start items-start">
          <h1 className="text-[10rem] font-bold">Register</h1>
          <RegisterForm />
        </div>
      </Container>
    </div>
  );
};

export default Register;
