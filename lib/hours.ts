import { businessInfo } from "./business-info";

const DAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export type DayKey = (typeof DAY_KEYS)[number];

export const DAY_LABELS: Record<DayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function formatHours(day: DayKey): string {
  const entry = businessInfo.hours[day];
  if (entry.closed) return "Closed";
  return `${entry.open} - ${entry.close}`;
}

export function getWeeklyHours() {
  return DAY_KEYS.map((day) => ({
    day,
    label: DAY_LABELS[day],
    hours: formatHours(day),
  }));
}

function parseTimeToMinutes(time: string): number | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toLowerCase();
  if (meridiem === "pm" && hours !== 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function isOpenNow(now: Date = new Date()): boolean {
  const dayKey = DAY_KEYS[now.getDay()];
  const entry = businessInfo.hours[dayKey];
  if (entry.closed) return false;

  const openMinutes = parseTimeToMinutes(entry.open);
  const closeMinutes = parseTimeToMinutes(entry.close);
  if (openMinutes === null || closeMinutes === null) return false;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return nowMinutes >= openMinutes && nowMinutes < closeMinutes;
}
