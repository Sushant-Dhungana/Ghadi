import cloudinary from "@/utils/cloudinary";
import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  await connectDB();

  const { productId } = params;
  console.log("Fetching product with ID:", productId);

  try {
    const product = await Product.findById(productId);
    console.log("Product found:", product);

    if (!product) {
      console.warn("No product found for ID:", productId);
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Returning product:", product);
    return Response.json({ product }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching product:", error);

    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    } else {
      return Response.json(
        { message: "An unexpected error occurred" },
        { status: 400 }
      );
    }
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  await connectDB();

  const productId = params.productId;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
    const parts = product.image.split("/");
    const fileName = parts[parts.length - 1];
    const imageId = fileName.split(".")[0];

    await cloudinary.uploader
      .destroy(`ghadi/${imageId}`)
      .then((result) => console.log("Result:", result));

    await Product.findByIdAndDelete(productId);
    return Response.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    } else {
      return Response.json(
        { message: "An unexpected error occurred" },
        { status: 400 }
      );
    }
  }
}
