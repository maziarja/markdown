export function convertDate(data: Date | string | number | undefined): string {
  const date = new Date(data || "");
  if (!isFinite(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
