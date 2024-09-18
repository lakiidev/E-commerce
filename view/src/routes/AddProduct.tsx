import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Container from "../components/Container";
import axios from "axios";
import { toast } from "sonner";

interface AddProductProps {}

const schema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productPrice: z
    .number()
    .positive("Product price must be a positive number")
    .nonnegative("Product price must be a non-negative number"),
  productDescription: z.string().nonempty("Product description is required"),
  productImage: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Product image is required")
    .refine(
      (files) => ["image/jpeg", "image/png"].includes(files[0]?.type),
      "Unsupported file format"
    ),
});

type IFormInput = z.infer<typeof schema>;

const AddProduct: FC<AddProductProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productPrice", data.productPrice.toString());
    formData.append("productDescription", data.productDescription);
    formData.append("productImage", data.productImage[0]);

    try {
      const response = await axios.post("/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <Container className="mt-36">
      <h1 className="text-xl">Add product</h1>
      <form
        className="flex flex-col gap-5 w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Product name"
          {...register("productName")}
        />
        {errors.productName && <p>{errors.productName.message}</p>}

        <input
          type="number"
          step="0.01"
          pattern="^\d*(\.\d{0,2})?$"
          placeholder="Product price"
          {...register("productPrice", { valueAsNumber: true })}
        />
        {errors.productPrice && <p>{errors.productPrice.message}</p>}

        <input
          type="text"
          placeholder="Product description"
          {...register("productDescription")}
        />
        {errors.productDescription && (
          <p>{errors.productDescription.message}</p>
        )}

        <input type="file" accept="image/*" {...register("productImage")} />
        {errors.productImage && <p>{errors.productImage.message}</p>}

        <button type="submit">Add product</button>
      </form>
    </Container>
  );
};

export default AddProduct;
