import { FC, useEffect, useRef } from "react";
import Container from "../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createOrders } from "../store/ordersSlice/ordersSlice";

interface SuccessProps {}

const Success: FC<SuccessProps> = ({}) => {
  const navigate = useNavigate();
  const effectRan = useRef(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentIntentId = searchParams.get("payment_intent");

    if (effectRan.current) return;
    effectRan.current = true;

    const fetchOrder = async () => {
      if (!paymentIntentId) {
        navigate("/");
        toast.error("An error occured. Please try again.");
      } else {
        await dispatch(createOrders(paymentIntentId));
      }
    };
    fetchOrder();
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
