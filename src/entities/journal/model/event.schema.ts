export type EventStatus = 100 | 200 | 300;

export type EventType = {
  id: number;
  ipAdress: string | null;
  status: EventStatus;
  createdAt: ISOtime;
};

export type EventResponseType = {
  items: EventType[];
  totalCount: number;
};
