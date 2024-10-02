import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FC, useState, FormEvent } from "react";
import { toast } from "sonner";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { createOrders } from "../store/ordersSlice/ordersSlice";

interface CheckoutFormProps {
  total: number;
}

const CheckoutForm: FC<CheckoutFormProps> = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message);
        setIsProcessing(false);
      } else {
        toast.error("An unexpected error occured.");
        setIsProcessing(false);
      }
    }
  };
  return (
    <div className="w-4/5">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          disabled={isProcessing || !stripe || !elements}
          className="text-2xl font-medium mt-5 bg-[#01E3EB] hover:bg-black hover:text-[#01E3EB] transition-all duration-300 px-5 py-1 rounded-2xl"
          type="submit"
        >
          {isProcessing ? "Processing ... " : "Pay now"}
        </button>
      </form>
      <h5 className="text-xl mt-5">Total: ${total}</h5>
    </div>
  );
};

export default CheckoutForm;
