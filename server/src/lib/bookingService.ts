import { string } from "zod";
import { prisma } from "./db.js";
import { AppError } from "./errors.js";
import type { CreateBookingInput } from "./schemas.js";
import { overlaps } from "./overlap.js";
import { generateSlots } from "./slots.js";
const OPEN_HOUR = 9;
const CLOSE_HOUR = 17;

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
  const booking = await prisma.booking.findUnique({
    where: { id:id }
  });
  if ( !booking ) throw new AppError(404, "Booking Not Found");
  if (booking.status === "CANCELLED" ) throw new AppError(400, "Booking is Already Cancelled");

  return prisma.booking.update({
    where: {id:id},
    data: { status: "CANCELLED"},
  })
}

export async function getAvailability(serviceId: number, date: string) {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });
  if (!service) throw new AppError(404, "Service not found");

  const dayStart = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(dayStart.getTime())) {
    throw new AppError(400, "Invalid date");
  }
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60_000);

  const slots = generateSlots(date, OPEN_HOUR, CLOSE_HOUR, service.durationMin);

  const bookings = await prisma.booking.findMany({
    where: {
      status: "CONFIRMED",
      startsAt: { lt: dayEnd },
      endsAt: { gt: dayStart },
    },
  });

  const now = new Date();
  const durationMs = service.durationMin * 60_000;

  return slots
    .filter((slotStart) => {
      if (slotStart < now) return false;
      const slotEnd = new Date(slotStart.getTime() + durationMs);
      return !bookings.some((b) =>
        overlaps(slotStart, slotEnd, b.startsAt, b.endsAt),
      );
    })
    .map((slot) => slot.toISOString());
}

