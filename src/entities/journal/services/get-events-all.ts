import { EventResponseType } from "../model/event.schema";

type ServiceParams = {
  skip: number;
  limit: number;
};

export const getEventsAll = async (props: ServiceParams) => {
  const skip = String(props.skip);
  const limit = String(props.limit);

  try {
    const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;
    const params = new URLSearchParams({ skip, limit }).toString();
    const url = ENV_URL + "/api/Events?" + params;

    const response = await fetch(url);

    if (response.status >= 400) throw new Error();

    const data = await response.json();
    return data as EventResponseType;
  } catch (err) {
    throw err;
  }
};
