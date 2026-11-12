import { Router } from "express";
import { createBookingSchema } from "../lib/schemas.js";
import { createBooking, listBookingsByEmail } from "../lib/bookingService.js";
import { z } from 'zod'

export const bookingsRouter = Router();

bookingsRouter.post("/", async (req, res) => {
  const input = createBookingSchema.parse(req.body);
  // the real booking logic arrives in Class 5
  const booking = await createBooking(input);
  res.status(201).json({ received: input });
});

bookingsRouter.get("/", async (req, res) => {
  //const { email } = z.object({ email: z.string().email() }).parse(req.query);
  const { email } = z.object({ email: z.email() }).parse(req.query);
  const bookings = await listBookingsByEmail(email);
  res.json(bookings);
});