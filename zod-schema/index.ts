import { z } from "zod";

export const ZodCheckoutSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  fullName: z
    .string()
    .min(5, { message: "Full name must be at least 5 characters long" })
    .max(100, { message: "Full name cannot exceed 100 characters" }),
  mobile: z.string().regex(/^\d{11}$/, {
    message: "Mobile number must be 11 digits",
  }),
  deliveryAddress: z
    .string()
    .min(5, { message: "Delivery address must be at least 5 characters long" })
    .max(200, { message: "Delivery address cannot exceed 200 characters" }),
  suburbOrTown: z
    .string()
    .min(2, { message: "Suburb/Town must be at least 2 characters long" })
    .max(100, { message: "Suburb/Town cannot exceed 100 characters" }),
  cityOrState: z
    .string()
    .min(2, { message: "City/State must be at least 2 characters long" })
    .max(100, { message: "City/State cannot exceed 100 characters" }),
  postalOrZipCode: z
    .string()
    .regex(/^\d{4,10}$/, { message: "Postal/Zip code must be 4-10 digits" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters long" })
    .max(100, { message: "Country cannot exceed 100 characters" }),
});

export const ZodCreditCardSchema = z.object({
  cardNumber: z.string().regex(/^\d{13,19}$/, {
    message: "Card number must be 13-19 digits",
  }),
  cardHolderName: z
    .string()
    .min(2, { message: "Cardholder name must be at least 2 characters" })
    .max(50, { message: "Cardholder name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Cardholder name must contain only letters and spaces",
    }),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
    message: "Expiration date must be in MM/YY format",
  }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
});

export const ZodLoginSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long."),
    password: z.string().min(5, "Password must be at least 5 characters long."),
  })
  .required();

export type TLoginSchema = z.infer<typeof ZodLoginSchema>;
export type TCheckoutSchema = z.infer<typeof ZodCheckoutSchema>;
export type TCreditCardSchema = z.infer<typeof ZodCreditCardSchema>;
