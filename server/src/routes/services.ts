import { Router } from "express";
import { prisma } from "../lib/db.js";

export const servicesRouter = Router();

servicesRouter.get("/", async (_req, res) => {
  const services = await prisma.service.findMany();
  res.json(services);
});