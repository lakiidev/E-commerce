import { useEffect, useMemo, useState } from "react";
import Container from "./components/Container";
import { Product } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { toast } from "sonner";
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";
import { Link } from "react-router-dom";
import { LuArrowDownRight } from "react-icons/lu";
import { loadProducts } from "./store/productsSlice/productsSlice";

function App() {
  //get all the products from the server
  const productsSelect = useSelector((state: RootState) => state.product);
  const products = Object.values(productsSelect) as Product[];
  const dispatch = useDispatch<AppDispatch>();

  const fetchProducts = async () => {
    try {
      const result = await dispatch(loadProducts());
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const memoizedProducts = useMemo(() => products, [products]);
  return (
    <>
      <Container className="mt-36 h-full">
        <div className="flex flex-row gap-4 items-center">
          <h1 className="text-[12rem] font-bold uppercase tracking-tighter leading-none">
            All
          </h1>
          <div className="flex border-zinc-400 border-2 rounded-full w-20 h-20 items-center justify-center">
            <p className="h-fit w-fit text-4xl font-bold">
              {memoizedProducts.length}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 auto-rows-fr w-full gap-y-36 pb-20">
          {memoizedProducts.map((product) => (
            <div className="space-y-5">
              <div
                key={product.id}
                className="flex flex-col gap-4 bg-[#F2F2EF] aspect-square items-center justify-center"
              >
                <AsyncImage
                  src={`/uploads/${product.image_url}`}
                  alt={product.name}
                  Transition={(props) => <Blur radius={10} {...props} />}
                  className="w-72 h-72 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                  <h1 className="text-4xl font-bold uppercase tracking-tighter">
                    {product.name}
                  </h1>
                  <Link
                    to={`/products/${product.id}`}
                    className="bg-[#01E3EB] min-w-10 flex items-center justify-center rounded-full"
                  >
                    <LuArrowDownRight size={50} className="p-3" />
                  </Link>
                </div>
                <p className="text-xl mt-2">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default App;
