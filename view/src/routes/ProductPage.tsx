import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartItem, Product } from "../types";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loadProduct } from "../store/productsSlice/productsSlice";
import Container from "../components/Container";
import Counter from "../components/Counter";
import { LuArrowDownRight } from "react-icons/lu";
import { useSelector } from "react-redux";
import { setPendingProduct } from "../store/productsSlice/pendingProductSlice";
import { addItem } from "../store/cartSlice/cartSlice";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [count, setCount] = useState<number>(0);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const pendingProduct = useSelector(
    (state: RootState) => state.pendingProduct
  );
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          throw new Error("Product ID not provided");
        } else {
          const result = await dispatch(loadProduct(id));
          setProduct((result.payload as { product: Product }).product);
        }
      } catch (error) {
        toast.error("Failed to fetch product");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <Container>
        <h1 className="font-black text-6xl">Loading product...</h1>
      </Container>
    );
  }
  //prduct to be added to the cart after login
  const purchaseHandler = async () => {
    //1. Check if the user is logged in
    //2. If the user is logged in, add the product to the cart\
    //3. If the user is not logged in, redirect the user to the login page, but save the product to be added to the cart after login
    //4. If login is successful, add the product to the cart and redirect the user to the cart page
    if (!isLoggedIn) {
      toast.info("Please login to purchase the product");
      // creta new cartItem object
      const cartItem: CartItem = {
        ...product,
        quantity: count,
      };
      dispatch(setPendingProduct(cartItem));
      navigate("/login");
    }

    //if the user is logged in
    //add the product to the cart
    else {
      dispatch(addItem({ product, qty: count }));
      navigate("/cart");
    }
  };

  return (
    <div className="w-full flex mt-10 text-white">
      <div className="flex flex-1 bg-[#F2F2EF] items-center justify-center">
        <img
          src={`/uploads/${product.image_url}`}
          alt={product.name}
          className="w-4/5 scale-75"
        />
      </div>
      <div className="flex-1 bg-[#c7c5bb] tracking-tighter flex flex-col justify-between  px-5">
        <h1 className="text-6xl uppercase font-black">{product.name}.</h1>
        <div className="flex justify-between">
          <p className="text-6xl font-bold px-5 tracking-tighter">
            ${product.price}
          </p>
          <p className="text-2xl px-5 text-right">{product.description}</p>
        </div>
        <div className="mb-3 flex justify-between gap-52">
          <Counter count={count} setCount={setCount} />
          <button
            className="group rounded-full flex-1 flex flex-row items-center bg-[#01E3EB] hover:bg-black text-white p-4 w-fit transition-all duration-300"
            onClick={purchaseHandler}
          >
            <div className="flex-1 uppercase text-black group-hover:text-[#01E3EB] tracking-tighter font-black text-2xl py-3 transition-all duration-300">
              Purchase
            </div>
            <div className="h-full aspect-square flex items-center justify-center bg-black group-hover:bg-[#01E3EB] rounded-full transition-all duration-300">
              <LuArrowDownRight size={40} className="p-2" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
