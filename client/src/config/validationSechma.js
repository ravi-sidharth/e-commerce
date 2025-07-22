import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .min({ message: "Please enter your email address." })
    .email({ message: "Please enter valid email address." }),
  password: z.string().min(1, { message: "Please enter your password." }),
});

export const registerSchema = z.object({
  userName: z.string().min(1, { message: "Please enter your Name." }),
  email: z
    .string()
    .min({ message: "Please enter your email address." })
    .email({ message: "Please enter valid email address." }),
  password: z
    .string()
    .min(1, { message: "Please enter your password." })
    .min(5, { message: "Password must be 8 or more characters long" }),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"), 
  logo: z
    .instanceof(File, { message: "Logo file is required" }) 
    .refine((file) => file.size > 0, "Logo is required"),
});

export const brandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
});

export const subCategorySchema = z.object({
  category: z.string().min(1, "Category name is required"),
  name: z.string().min(1, "Sub Category name is required"),
});

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(30, "Description must be at least 30 characters"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().positive("Price must be a positive number")
  ),
  salePrice: z.preprocess(
    (val) => Number(val),
    z.number().positive("Sale price must be a positive number")
  ),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  size: z.string().min(1, "Size is required"),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Stock must be 0 or a positive number")
  ),
  images: z
    .array(z.instanceof(File))
    .refine((val) => val.length === 0 || val.length === 4, {
      message: "You must upload exactly 4 images or none",
    }),
});

export const addressSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(1, "Pincode is required"),
  phone: z.string().min(1, "Phone is required"),
  notes: z.string().min(1, "Notes is required"),
});
