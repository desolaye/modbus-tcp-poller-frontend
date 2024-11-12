export const isoToTime = (iso: string | null, withTime?: boolean) => {
  if (iso === null) return "Не задано";

  const date = new Date(Date.parse(iso));
  const day =
    Number(date.getDate()) < 10 ? `0${date.getDate()}` : date.getDate();

  const month =
    Number(date.getMonth()) < 9
      ? `0${Number(date.getMonth()) + 1}`
      : `${Number(date.getMonth()) + 1}`;

  const year = date.getFullYear();
  const stringDate = `${day}.${month}.${year}`;

  if (!withTime) return stringDate;

  const hours =
    Number(date.getHours()) < 10 ? `0${date.getHours()}` : date.getHours();
  const mins =
    Number(date.getMinutes()) < 10
      ? `0${date.getMinutes()}`
      : date.getMinutes();

  return `${stringDate} ${hours}:${mins}`;
};
