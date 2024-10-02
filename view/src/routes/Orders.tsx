import { FC, useEffect } from "react";
import Container from "../components/Container";
import { loadOrders } from "../store/ordersSlice/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { CartItem } from "../types";

interface OrdersProps {}

const Orders: FC<OrdersProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);
  useEffect(() => {
    const getOrders = async () => {
      await dispatch(loadOrders());
    };
    getOrders();
  }, []);

  return (
    <Container>
      <h1 className="text-[12rem] tracking-tighter font-bold uppercase">
        Odrers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 auto-rows-fr w-full gap-y-36 pb-20">
        {orders.map((order) => (
          <div
            className="bg-[#F2F2EF] aspect-square relative flex flex-col justify-center items-center text-2xl uppercase font-bold"
            key={order.id}
          >
            <p>Order ID: #{order.id}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
            <p>Order Date: {new Date(order.createdat).toLocaleDateString()}</p>
            <p className="mt-5 text-sm text-zinc-500">
              {order.items.length > 3
                ? order.items.slice(0, 3).map((item: CartItem) => (
                    <span key={item.id}>
                      {item.name} x {item.quantity},{" "}
                    </span>
                  ))
                : order.items.map((item: CartItem) => (
                    <span key={item.id}>
                      {item.name} x {item.quantity}{" "}
                      {order.items.length > 1 && ","}
                    </span>
                  ))}
              {order.items.length > 3 && "..."}
            </p>
            <Link
              to={`/orders/${order.id}`}
              className="absolute bottom-5 right-5 flex items-center gap-3"
            >
              Order Details: <LuArrowRight />
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Orders;
