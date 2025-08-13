import { connectDB } from "@/app/api/db/connectDB";
import Product from "@/app/api/models/product.model";
import cloudinary from "@/utils/cloudinary";

export async function GET(
  request: Request,
  { params }: { params: any }
) {
  await connectDB();
  const { productId } = params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    return Response.json({ product }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: any } 
) {
  await connectDB();
  const { productId } = params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if it exists
    if (product.image) {
      const parts = product.image.split("/");
      const fileName = parts[parts.length - 1];
      const imageId = fileName.split(".")[0];

      await cloudinary.uploader
        .destroy(`ghadi/${imageId}`)
        .then((result) => console.log("Cloudinary deletion result:", result))
        .catch((err) => console.error("Cloudinary deletion error:", err));
    }

    // Delete product from database
    await Product.findByIdAndDelete(productId);

    return Response.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}
