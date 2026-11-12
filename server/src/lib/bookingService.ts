import { string } from "zod";
import { prisma } from "./db.js";
import { AppError } from "./errors.js";
import type { CreateBookingInput } from "./schemas.js";

export async function createBooking(input: CreateBookingInput) {
  const service = await prisma.service.findUnique({
    where: { id: input.serviceId },
  });
  if (!service) throw new AppError(404, "Service not found");

  const startsAt = new Date(input.startsAt);
  const endsAt = new Date(startsAt.getTime() + service.durationMin * 60_000);
  if (startsAt < new Date()) {
    throw new AppError(400, "Cannot book in the past");
  }

  const clash = await prisma.booking.findFirst({
    where: {
      status: "CONFIRMED",
      startsAt: { lt: endsAt },
      endsAt: { gt: startsAt },
    },
  });
  if (clash) throw new AppError(409, "That time slot is already taken");

  return prisma.booking.create({
    data: {
      serviceId: service.id,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      startsAt,
      endsAt,
    },
  });
}

export async function listBookingsByEmail(email: string) {
    
  return prisma.booking.findMany({
    where: { customerEmail: email },
    orderBy: { startsAt: "desc" },
    include: { service: true },
  });
}

export async function cancelBooking(id: number) {
  // another new function
}

export async function getAvailability(serviceId: number, date: string) {
  // another new function (we'll do this one last)
}