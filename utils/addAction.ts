"use server";
import { connectDB } from "@/app/api/db/connectDB";
import cloudinary from "./cloudinary";
import Product from "@/app/api/models/product.model";

export async function addAction(formData: FormData) {
  try {
    const image = formData.get("image") as File;
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const link = formData.get("link");

    if (!image || !name || !description || !price || !link) {
      return {
        error: "All fields are required",
      };
    }

    await connectDB();

    // image processes
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const imageResponse = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "ghadi",
          },
          async (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as { secure_url: string });
            }
          }
        ).end(buffer);
      }
    );
    console.log(imageResponse);
    await Product.create({
      image: imageResponse.secure_url,
      name,
      description,
      price,
      link,
    });
    return {
      success: "Product added successfully",
    };
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
}
