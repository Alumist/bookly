import { z } from "zod";

export const createBookingSchema = z.object({
  serviceId: z.number().int().positive(),
  customerName: z.string().min(1).max(100),
  customerEmail: z.string().email(),
  startsAt: z.string().datetime(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;