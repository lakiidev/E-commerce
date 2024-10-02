import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { loadOrder } from "../store/ordersSlice/ordersSlice";
import Container from "../components/Container";
import { Order } from "../types";

interface OrderPageProps {}

const OrderPage: FC<OrderPageProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        const resultAction = await dispatch(loadOrder(parseInt(id)));
        if (loadOrder.fulfilled.match(resultAction)) {
          setOrder(resultAction.payload.order);
        }
      }
    };
    fetchOrder();
  }, [id]);
  return (
    <Container>
      {order ? (
        <div>
          <h1 className="text-[12rem] tracking-tighter font-bold">
            Odrer ID: #{id}
          </h1>
          <h2 className="text-4xl text-black capitalize font-semibold">
            Status:{" "}
            <span className="font-black text-[#01E3EB] uppercase">
              {order.status}
            </span>
          </h2>
          <h3 className="mt-20 text-6xl font-bold">Items</h3>
          <div>
            {order.items &&
              order.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-5 mt-10">
                  <img
                    src={`/uploads/${item.image_url}`}
                    alt=""
                    className="max-w-32"
                  />
                  <p className="text-3xl font-bold">{item.name}</p>
                  <p className="text-2xl font-bold">x {item.quantity}</p>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <h1 className="text-6xl font-bold">No order found with given id.</h1>
      )}
    </Container>
  );
};

export default OrderPage;
