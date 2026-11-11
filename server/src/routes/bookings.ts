import { Router } from "express";
import { createBookingSchema } from "../lib/schemas.js";

export const bookingsRouter = Router();

bookingsRouter.post("/", async (req, res) => {
  const input = createBookingSchema.parse(req.body);
  // the real booking logic arrives in Class 5
  res.status(201).json({ received: input });
});