import type {
  Booking,
  BookingWithService,
  CreateBookingBody,
  Service,
} from "./types";

const API = import.meta.env.VITE_API_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      typeof data.error === "string" ? data.error : "Something went wrong",
    );
  }
  return data as T;
}

export const getServices = () => request<Service[]>("/services");

export const getAvailability = (serviceId: number, date: string) =>
  request<string[]>(`/availability?serviceId=${serviceId}&date=${date}`);

export const createBooking = (body: CreateBookingBody) =>
  request<Booking>("/bookings", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const getMyBookings = (email: string) =>
  request<BookingWithService[]>(`/bookings?email=${encodeURIComponent(email)}`);

export const cancelBooking = (id: number) =>
  request<Booking>(`/bookings/${id}/cancel`, { method: "PATCH" });