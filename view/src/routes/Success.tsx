import { FC, useEffect, useRef } from "react";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SuccessProps {}

const Success: FC<SuccessProps> = ({}) => {
  const navigate = useNavigate();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;
    setTimeout(() => {
      navigate("/");
      toast.info("You can see your order in the orders page.");
    }, 5000);
  }, []);
  return (
    <Container className="flex flex-col gap-5 w-full h-full items-center mt-40  ">
      <h1 className="text-6xl font-bold">🎉 Payment successful</h1>
      <p className="text-2xl">
        Thank you for your purchase. You will be redirected shortly...
      </p>
    </Container>
  );
};

export default Success;
