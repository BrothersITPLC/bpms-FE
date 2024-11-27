export function formatFriendlyDate(isoDate) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Date(isoDate).toLocaleString(undefined, options);
}
