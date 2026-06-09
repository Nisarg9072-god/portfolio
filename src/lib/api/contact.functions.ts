import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { sendContactEmail } from "../email.server";

const contactInputSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Enter a valid email"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  website: z.string().optional(),
});

export const submitContactForm = createServerFn({ method: "POST" })
  .validator(contactInputSchema)
  .handler(async ({ data }) => {
    if (data.website) {
      return { success: true as const };
    }

    const result = await sendContactEmail({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    if (!result.ok) {
      throw new Error(result.error);
    }

    return { success: true as const };
  });
