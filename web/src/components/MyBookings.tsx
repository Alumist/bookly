import { useState, type FormEvent } from "react";
import { cancelBooking, getMyBookings } from "../api";
import { errorMessage, formatDateTime, formatPrice } from "../format";
import type { BookingWithService } from "../types";

export function MyBookings() {
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState("");
  const [bookings, setBookings] = useState<BookingWithService[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(address: string) {
    setLoading(true);
    setError(null);
    try {
      setBookings(await getMyBookings(address));
      setSearched(address);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void load(email.trim().toLowerCase());
  }

  async function handleCancel(id: number) {
    setError(null);
    try {
      await cancelBooking(id);
      await load(searched);
    } catch (e) {
      setError(errorMessage(e));
    }
  }

  return (
    <div>
      <h2>Find your bookings</h2>
      <form className="form" onSubmit={handleSearch}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Searching…" : "Show my bookings"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {bookings && bookings.length === 0 && <p>No bookings found.</p>}

      {bookings && bookings.length > 0 && (
        <ul className="list">
          {bookings.map((b) => (
            <li key={b.id} className="card">
              <strong>{b.service.name}</strong>
              <span>
                {formatDateTime(b.startsAt)} · {formatPrice(b.service.priceCents)}
              </span>
              <span className={b.status === "CANCELLED" ? "muted" : ""}>
                {b.status === "CANCELLED" ? "Cancelled" : "Confirmed"}
              </span>
              {b.status === "CONFIRMED" && (
                <button type="button" onClick={() => void handleCancel(b.id)}>
                  Cancel booking
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}