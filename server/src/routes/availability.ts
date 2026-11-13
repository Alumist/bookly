import { Router } from "express";
import { z } from "zod";
import { getAvailability } from "../lib/bookingService.js";

export const availabilityRouter = Router();

const querySchema = z.object({
  serviceId: z.coerce.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

availabilityRouter.get("/", async (req, res) => {
  const { serviceId, date } = querySchema.parse(req.query);
  const slots = await getAvailability(serviceId, date);
  res.json(slots);
});