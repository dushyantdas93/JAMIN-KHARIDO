import { z } from "zod";
import { Customer } from "../models/customer.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import multer from "multer";
import bcrypt from "bcryptjs";
import { unlink } from "fs/promises";
const customerSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  address: z.string().optional(), // Address is optional
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
});

const optionalCustomerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email format" }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .optional(),
  address: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" })
    .optional(),
  image: z
    .object({
      mimetype: z.string().regex(/^image\/(jpeg|png|gif|webp)$/, {
        message: "Only JPEG, PNG, GIF, or WEBP images are allowed",
      }),
      size: z
        .number()
        .max(5 * 1024 * 1024, { message: "Image size must not exceed 5MB" }),
    })
    .optional(),
});



export async function getCustomerDetails(req, res) {

  const { id } = req.customer 

  try {
    const get = await Customer.findById(id)
    console.log(get)
    return res.status(200).send({
      success: true,
      get,
      message: "get customer",
    });
    
  } catch (error) {
    console.log(error)
     return res.status(401).json({ error: "customer not get" });
  }




}

export async function createCustomer(req, res) {
  const { name, email, password, address, phoneNumber } = req.body;

  const parsed = customerSchema.safeParse({
    name,
    email,
    password,
    address,
    phoneNumber,
  });
const isPresent = await Customer.findOne({
  $or: [{ email }, { phoneNumber }],
});

if (isPresent) {
  return res
    .status(409)
    .json({ message: "Email or phone number already exists" });
}

  let file = req.file;
  console.log(file);

  const cropParams = {
    gravity: "auto",
    width: 300,
    height: 300,
    crop: "crop",
  };

  try {
    let result = "";
    if (file) {
      result = await cloudinary.uploader.upload(file?.path, {
        folder: "jameen_kharido",
        resource_type: "raw",
        transformation: cropParams,
      });
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error deleting the file:", err);
        } else {
          console.log("File deleted successfully:", file.path);
        }
      });
    }
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    const encryptedPass = await bcrypt.hash(parsed.data.password, 10);

    parsed.data.password = encryptedPass;

    const customer = await Customer.create({
      ...parsed.data,
      avatar: result.url || "",
    });

    if (customer) {
      return res.status(201).json({
        success: true,
        message: "customer registered successfully",
        customer,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function editCustomerDetails(req, res) {
  const customerid = req.customer._id;
  console.log("Customer ID:", customerid);

  try {
    const { name, email, password, address, phoneNumber } = req.body;

    let image = req.files?.image
      ? {
          mimetype: req.files.image.mimetype,
          size: req.files.image.size,
        }
      : undefined;

    // Validate input data with zod
    const parsed = optionalCustomerSchema.safeParse({
      name,
      email,
      password,
      address,
      phoneNumber,
    });

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    req.validatedBody = parsed.data;

    // If an image is provided, upload to Cloudinary
    if (image) {
      const cropParams = {
        width: 300,
        height: 300,
        crop: "crop",
        gravity: "auto",
      };

      console.log("Starting image upload...");

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(image.filepath, {
        folder: "profile",
        transformation: cropParams,
      });

      console.log("Image upload complete.");

      // Get the image URL after upload
      image = result?.url;
      console.log("Uploaded Image URL:", image);
    }

    // Prepare the updated data (name, email, password, etc. along with image URL)
    const updatedData = {
      ...parsed.data, // existing validated data
      avatar: image, // newly uploaded image URL (if available)
    };

    console.log("Updated Data:", updatedData);

    // Update the customer document
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerid, // Use customerid directly here
      updatedData, // Spread the updated data directly
      { new: true, runValidators: true } // Ensure that validation happens during the update
    );

    if (updatedCustomer) {
      return res.status(200).json({
        success: true,
        message: "Data updated successfully",
        updatedCustomer,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
  } catch (error) {
    console.log("Error in updating customer:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}


