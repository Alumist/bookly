export type Service = {
  id: number;
  name: string;
  durationMin: number;
  priceCents: number;
};

export type BookingStatus = "CONFIRMED" | "CANCELLED";

export type Booking = {
  id: number;
  serviceId: number;
  customerName: string;
  customerEmail: string;
  startsAt: string;
  endsAt: string;
  status: BookingStatus;
  createdAt: string;
};

export type BookingWithService = Booking & { service: Service };

export type CreateBookingBody = {
  serviceId: number;
  customerName: string;
  customerEmail: string;
  startsAt: string;
};