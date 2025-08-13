"use client";
import { updateAction } from "@/utils/updateAction";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface Product {
  image: string;
  _id: string;
  name: string;
  price: number;
  link: string;
  description: string;
}
const UpdateForm = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const [imageURL, setImageURL] = React.useState("");
  const [product, setProduct] = React.useState<Product>();

  React.useEffect(() => {
    axios.get(`/api/product/${productId}`).then((response) => {
      setProduct(response.data.product);
    });
  }, [productId]);

  React.useEffect(() => {
    if (product) {
      setImageURL(product.image);
    }
  }, [product]);
  async function clientAddAction(formData: FormData) {
    const { error, success } = await updateAction(formData, productId);
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      router.push("/");
    }
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 1) {
        toast.error("Image size should be less than 1MB");
        e.target.value = ""; // reset file input
      } else {
        setImageURL(URL.createObjectURL(file));
      }
    }
  };
  return (
    <form
      action={clientAddAction}
      className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5"
    >
      {imageURL && (
        <Image
          src={imageURL}
          alt="preview"
          width={1000}
          height={1000}
          className="max-w-[17rem] h-72 object-center object-cover rounded-md"
        />
      )}
      <div className="flex flex-col w-full">
        <label>Product Image</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-md bg-white border border-gray-500"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          defaultValue={product?.name}
          placeholder="Enter product name"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-md bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Product Price</label>
        <input
          type="number"
          name="price"
          defaultValue={product?.price}
          placeholder="Enter product price"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-md bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Sellers link</label>
        <input
          type="text"
          name="link"
          defaultValue={product?.link}
          placeholder="Link to where buyers can find you"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-md bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Product Description</label>
        <textarea
          name="description"
          placeholder="Enter product description"
          rows={4}
          defaultValue={product?.description}
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-md bg-white border border-gray-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#252422] text-white py-1.5 md:py-2 rounded-md cursor-pointer"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateForm;
