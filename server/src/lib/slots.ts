export function generateSlots(
  date: string,
  openHour: number,
  closeHour: number,
  minutes: number,
): Date[] {
  const open = new Date(`${date}T${String(openHour).padStart(2, "0")}:00:00.000Z`);
  const close = new Date(`${date}T${String(closeHour).padStart(2, "0")}:00:00.000Z`);
  const stepMs = minutes * 60_000;
  const slots: Date[] = [];

  let start = open;
  while (start.getTime() + stepMs <= close.getTime()) {
    slots.push(start);
    start = new Date(start.getTime() + stepMs);
  }

  return slots;
}
