"use server";
import { connectDB } from "@/app/api/db/connectDB";
import cloudinary from "./cloudinary";
import Product from "@/app/api/models/product.model";

export async function updateAction(formData: FormData, id: string) {
  try {
    const image = formData.get("image") as File;
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const link = formData.get("link");

    if (!image || !name || !description || !price || !link) {
      return { error: "All fields are required" };
    }

    await connectDB();

    const product = await Product.findById(id);
    if (!product) {
      return { error: "Product not found" };
    }

    // If no new image is uploaded, keep the existing image
    if (image.size === 0) {
      await Product.findByIdAndUpdate(id, {
        name,
        description,
        price,
        link,
      });
      return { success: "Product updated successfully" };
    } else {
      // Delete old image from Cloudinary
      const parts = product.image.split("/");
      const fileName = parts[parts.length - 1];
      const imageId = fileName.split(".")[0];

      await cloudinary.uploader
        .destroy(`ghadi/${imageId}`)
        .then((result) => console.log("Result:", result));
      // Upload new image
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const imageResponse = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "auto",
                folder: "ghadi",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as { secure_url: string });
              }
            )
            .end(buffer);
        }
      );

      console.log(imageResponse);

      await Product.findByIdAndUpdate(id, {
        image: imageResponse.secure_url,
        name,
        description,
        price,
        link,
      });

      return { success: "Product updated successfully" };
    }
  } catch (error) {
    return { error: (error as Error).message };
  }
}
