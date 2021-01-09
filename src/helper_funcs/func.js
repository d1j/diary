export function formatDateWithDashes(date) {
  if (date == null) return 'YYYY-MM-DD';
  return `${date.getFullYear()}-${
    (date.getMonth() + 1) / 10 < 1
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  }-${date.getDate() / 10 < 1 ? '0' + date.getDate() : date.getDate()}`;
}

export function formatHoursMinutes(date) {
  if (date == null) return '--:--';
  return `${
    date.getHours() / 10 < 1 ? '0' + date.getHours() : date.getHours()
  }:${
    date.getMinutes() / 10 < 1 ? '0' + date.getMinutes() : date.getMinutes()
  }`;
}

export function isDateInFuture(date) {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  if (currentDate.getTime() < date.getTime()) {
    return true;
  }
  return false;
}
