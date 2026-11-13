import { useState, type FormEvent } from "react";
import { createBooking } from "../api";
import { errorMessage } from "../format";
import type { Booking } from "../types";

type Props = {
  serviceId: number;
  startsAt: string;
  onBooked: (booking: Booking) => void;
};

export function BookingForm({ serviceId, startsAt, onBooked }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const booking = await createBooking({
        serviceId,
        customerName: name.trim(),
        customerEmail: email.trim().toLowerCase(),
        startsAt,
      });
      onBooked(booking);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Booking…" : "Confirm booking"}
      </button>
    </form>
  );
}