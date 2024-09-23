import { FC, useEffect } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { toast } from "sonner";
import { loadCart, removeItem, updateItem } from "../store/cartSlice/cartSlice";
import { LuInfo, LuMinus, LuPlus, LuX } from "react-icons/lu";
import { CartItem } from "../types";
import { Link, useNavigate } from "react-router-dom";

interface CartProps {}

const Cart: FC<CartProps> = ({}) => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      await dispatch(loadCart());
    } catch (error) {
      toast.error("Failed to fetch cart");
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = (product: CartItem, quantity: number) => {
    if (quantity >= 1 && quantity <= 99) {
      dispatch(updateItem({ product, qty: quantity }));
    }
  };
  const removeItemFromCartHandler = (cartItemId: number) => {
    try {
      dispatch(removeItem(cartItemId));
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };

  return (
    <Container className="h-full mt-20">
      <div className="flex gap-5 items-center mb-20">
        <h1 className="text-[12rem] tracking-tighter font-bold uppercase">
          Cart
        </h1>
        <div className="flex w-20 h-20 rounded-full border-2 border-zinc-400 items-center justify-center">
          <p className="h-fit w-fit text-4xl font-bold">
            {items.reduce(
              (acc: number, item: CartItem) => acc + item.quantity,
              0
            )}
          </p>
        </div>
      </div>
      {items.length === 0 ? (
        <h1 className="flex text-6xl font-bold tracking-tighter">
          Cart is empty.{" "}
          <span className="block ml-5 font-normal underline lowercase text-3xl my-auto">
            <Link to="/">Add items to cart</Link>
          </span>
        </h1>
      ) : (
        <div className="flex justify-between gap-20 items-start pb-20">
          <div className="flex-1 flex flex-col gap-10">
            {items.map((item) => (
              <div className="flex gap-5" key={item.id}>
                <div className=" w-2/5 bg-[#F2F2EF]">
                  <img
                    src={`/uploads/${item.image_url}`}
                    alt={item.name}
                    className="scale-75"
                  />
                </div>
                <div className="flex flex-col w-3/5 justify-start items-start">
                  <div>
                    <h3 className="text-4xl uppercase font-bold tracking-tighter">
                      {item.name}
                    </h3>
                  </div>
                  <h4 className="uppercase font-normal text-3xl tracking-tighter">
                    Price: ${item.price}
                  </h4>
                  <div className="mt-auto w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-2xl uppercase tracking-tighter">
                        <h4 className="mr-3">Quantity:</h4>
                        <button
                          className="text-zinc-500"
                          disabled={item.quantity >= 99}
                          onClick={() =>
                            handleUpdateQuantity(item, item.quantity + 1)
                          }
                        >
                          <LuPlus size={24} />
                        </button>
                        <p className="px-1">{item.quantity}</p>
                        <button
                          className="text-zinc-500"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            handleUpdateQuantity(item, item.quantity - 1)
                          }
                        >
                          <LuMinus size={24} />
                        </button>
                      </div>
                      <div className="relative w-full flex justify-end">
                        <div className="group cursor-pointer">
                          <LuX
                            size={32}
                            onClick={() => {
                              removeItemFromCartHandler(item.cartitemid);
                            }}
                          />
                          <div className="absolute flex items-center gap-2 -right-1/4 -top-7 text-center  bg-[#F2F2EF] px-3 py-2s rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <LuInfo size={12} color="#52525b" />
                            Remove item
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-10 bg-[#F2F2EF] py-14 px-10 rounded-[40px] text-2xl font-normal">
            <div className="flex justify-between ">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between">
              <p>Total price</p>
              <p>
                ${" "}
                {items
                  .reduce(
                    (acc: number, item: CartItem) =>
                      acc + item.price * item.quantity,
                    0
                  )
                  .toFixed(2) || 0}
              </p>
            </div>
            <button
              className="w-fit bg-[#01E3EB] text-black uppercase rounded-2xl py-3 px-4"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;
