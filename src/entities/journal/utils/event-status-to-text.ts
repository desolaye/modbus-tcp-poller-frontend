import { EventStatus } from "../model/event.schema";

export const eventStatusToText = (status?: EventStatus) => {
  if (status) {
    if (status === 100) return "Подтверждена";
    if (status === 200) return "Не подтверждена";
    if (status === 300) return "Исправлена";
  }

  return "Неизвестна";
};
