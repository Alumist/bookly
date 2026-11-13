import { useEffect, useState } from "react";
import { getServices } from "../api";
import { errorMessage, formatDateTime } from "../format";
import type { Booking, Service } from "../types";
import { BookingForm } from "./BookingForm";
import { ServiceList } from "./ServiceList";
import { SlotPicker } from "./SlotPicker";

const today = () => new Date().toISOString().slice(0, 10);

export function BookPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [serviceId, setServiceId] = useState<number | null>(null);
  const [date, setDate] = useState(today());
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch((e) => setError(errorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  function chooseService(id: number) {
    setServiceId(id);
    setSlot(null);
    setConfirmed(null);
  }

  function chooseDate(value: string) {
    if (!value) return;
    setDate(value);
    setSlot(null);
    setConfirmed(null);
  }

  function handleBooked(booking: Booking) {
    setConfirmed(booking);
    setSlot(null);
    setRefresh((r) => r + 1);
  }

  if (loading) return <p>Loading services…</p>;
  if (error) return <p className="error">{error}</p>;

  const service = services.find((s) => s.id === serviceId) ?? null;

  return (
    <div>
      {confirmed && service && (
        <p className="success">
          Booked! {service.name} on {formatDateTime(confirmed.startsAt)}.
        </p>
      )}

      <h2>1. Choose a service</h2>
      <ServiceList
        services={services}
        selectedId={serviceId}
        onSelect={chooseService}
      />

      {service && (
        <>
          <h2>2. Pick a date</h2>
          <input
            type="date"
            value={date}
            min={today()}
            onChange={(e) => chooseDate(e.target.value)}
          />

          <h2>3. Pick a time (UTC)</h2>
          <SlotPicker
            key={`${service.id}-${date}-${refresh}`}
            serviceId={service.id}
            date={date}
            selectedSlot={slot}
            onSelect={setSlot}
          />
        </>
      )}

      {service && slot && (
        <>
          <h2>4. Your details</h2>
          <BookingForm
            serviceId={service.id}
            startsAt={slot}
            onBooked={handleBooked}
          />
        </>
      )}
    </div>
  );
}