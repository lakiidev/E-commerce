import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginSchema } from "../../validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { LoginErrorPayload, loginUser } from "../../store/userSlice/userSlice";
import { addItem } from "../../store/cartSlice/cartSlice";
import { clearPendingPurchase } from "../../store/productsSlice/pendingProductSlice";

interface LoginFormProps {}
type LoginData = z.infer<typeof loginSchema>;

const LoginForm: FC<LoginFormProps> = ({}) => {
  const inputClassName =
    "bg-[#f2f2efe0] placeholder:text-black placeholder:font-bold px-12 py-7 rounded-[40px] ";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const pendingProduct = useSelector(
    (state: RootState) => state.pendingProduct
  );

  const onSubmit = async (data: LoginData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success("Login successful");
      if (pendingProduct.cartItem) {
        if (
          pendingProduct?.cartItem?.id &&
          pendingProduct.cartItem?.name &&
          pendingProduct.cartItem?.price &&
          pendingProduct.cartItem?.image_url &&
          pendingProduct.cartItem?.quantity
        ) {
          const item = {
            product: {
              ...pendingProduct.cartItem,
            },
            qty: pendingProduct.cartItem.quantity,
          };
          dispatch(addItem(item));
          dispatch(clearPendingPurchase());
          toast.success("Product added to cart");
        }

        navigate("/cart");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      const errorMessage = (error as LoginErrorPayload).message;
      toast.error(errorMessage);
    }
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
      <p className="font-normal flex gap-2 text-2xl mt-5">
        First time here?
        <Link
          className="underline font-semibold text-[#01E3EB] hover:text-[#01E3EB] cursor-pointer"
          to="/register"
        >
          Register
        </Link>
      </p>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="w-fit px-5 py-4 bg-[#01E3EB] rounded-3xl text-2xl font-semibold"
        >
          Login
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

export default LoginForm;
