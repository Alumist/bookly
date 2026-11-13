import { formatPrice } from "../format";
import type { Service } from "../types";

type Props = {
  services: Service[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export function ServiceList({ services, selectedId, onSelect }: Props) {
  return (
    <ul className="list">
      {services.map((s) => (
        <li key={s.id}>
          <button
            type="button"
            className="wide"
            aria-pressed={s.id === selectedId}
            onClick={() => onSelect(s.id)}
          >
            {s.name} · {s.durationMin} min · {formatPrice(s.priceCents)}
          </button>
        </li>
      ))}
    </ul>
  );
}
