import * as signalR from "@microsoft/signalr";

import { useFetch } from "@/shared/lib/use-fetch";
import { getAllModbusDevicesMock } from "@/entities/modbus-device/services/get-all-modbus-devices.mock";

export const useMainPage = () => {
  const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;

  const { data, isError, isLoading } = useFetch({
    fn: getAllModbusDevicesMock,
  });

  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${ENV_URL}/modbusHub`)
    .build();

  connection.on("ReceiveData", (data) => {
    console.log(data);
  });

  // connection.invoke("ReceiveData");
  // connection.stream("ReceiveData");

  connection.onclose((err) => console.error(err));
  connection.onreconnecting((err) => console.error(err));
  connection.start();

  return {
    values: {
      data,
      isError,
      isLoading,
    },
  };
};
