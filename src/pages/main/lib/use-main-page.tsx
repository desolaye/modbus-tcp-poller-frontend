import * as signalR from "@microsoft/signalr";

import { useFetch } from "@/shared/lib/use-fetch";
import { getAllModbusDevicesMock } from "@/entities/modbus-device/services/get-all-modbus-devices.mock";

export const useMainPage = () => {
  const { data, isError, isLoading } = useFetch({
    fn: getAllModbusDevicesMock,
  });

  let connection = new signalR.HubConnectionBuilder()
    .withUrl("/modbusHub")
    .build();

  connection.on("ReceiveData", (data) => {
    console.log(data);
  });

  return {
    values: {
      data,
      isError,
      isLoading,
    },
  };
};
