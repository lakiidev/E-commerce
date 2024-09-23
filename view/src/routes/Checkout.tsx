import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Container from "../components/Container";
import { loadStripe, PaymentIntent, Stripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = ({}) => {
  const { items } = useSelector((state: RootState) => state.cart);
  const total = items.reduce(
    (acc: number, item) => acc + item.price * item.quantity,
    0
  );
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchPublishableKey = async () => {
      const { data } = await axios.get("/carts/mine/config");
      loadStripe(data.publishableKey).then((stripe) =>
        setStripePromise(stripe)
      );
    };
    fetchPublishableKey();
  }, []);
  useEffect(() => {
    const fetchClientSecret = async () => {
      const { data } = await axios.post("/carts/mine/checkout", {
        total,
      });
      setClientSecret(data.clientSecret);
    };
    fetchClientSecret();
  }, []);

  return (
    <Container className="mt-20 mb-36">
      <h1 className="text-[12rem] font-bold tracking-tighter uppercase">
        Checkout
      </h1>
      <div className="flex gap-40 justify-between w-full mt-20">
        <div className="flex-1 flex flex-col gap-10">
          {items.map((item) => (
            <div key={item.id} className="flex gap-10">
              <div className="w-1/4 flex items-center justify-center bg-[#F2F2EF]">
                <img
                  src={`/uploads/${item.image_url}`}
                  alt=""
                  className="scale-75"
                />
              </div>

              <div className="w-3/4 uppercase flex flex-col justify-between">
                <div className="w-full flex justify-between">
                  <h2 className="text-3xl font-bold">{item.name}</h2>
                  <p className="text-2xl font-normal">Price:${item.price}</p>
                </div>
                <h3 className="text-2xl font-normal">
                  Quantity: {item.quantity}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex items-center bg-[#F2F2EF] rounded-[40px] p-10">
          {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm total={total} />
            </Elements>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
