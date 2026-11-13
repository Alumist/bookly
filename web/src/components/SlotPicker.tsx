import { useEffect, useState } from "react";
import { getAvailability } from "../api";
import { errorMessage, formatTime } from "../format";

type Props = {
  serviceId: number;
  date: string;
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
};

export function SlotPicker({ serviceId, date, selectedSlot, onSelect }: Props) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    getAvailability(serviceId, date)
      .then((result) => {
        if (!ignore) setSlots(result);
      })
      .catch((e) => {
        if (!ignore) setError(errorMessage(e));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [serviceId, date]);

  if (loading) return <p>Loading times…</p>;
  if (error) return <p className="error">{error}</p>;
  if (slots.length === 0) {
    return <p>No times left that day. Try another date.</p>;
  }

  return (
    <div className="slots">
      {slots.map((slot) => (
        <button
          key={slot}
          type="button"
          aria-pressed={slot === selectedSlot}
          onClick={() => onSelect(slot)}
        >
          {formatTime(slot)}
        </button>
      ))}
    </div>
  );
}