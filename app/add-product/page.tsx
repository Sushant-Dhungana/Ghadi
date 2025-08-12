import AddForm from "@/components/AddForm";
import React from "react";

const AddProduct = () => {
  return (
    <div className="px-4 md:px-12 bg-[#f8f9fa] pb-8">
      <h2 className="text-center font-semibold pt-8 text-xl md:text-2xl w-full max-w-xl mx-auto">
        Add a New Product
      </h2>
      {/* form component */}
      <AddForm />
    </div>
  );
};

export default AddProduct;
