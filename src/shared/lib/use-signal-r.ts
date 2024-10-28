import { useState } from "react";
import * as signalR from "@microsoft/signalr";

import { ModbusDevicePollType } from "@/entities/modbus-device";

type UseSignalRProps = {
  method: string;
  enabled?: boolean;

  onMessageRecieve: (data: ModbusDevicePollType) => void;
};

export const useSignalR = (props: UseSignalRProps) => {
  const { method, enabled = true, onMessageRecieve } = props;
  const [isSignalError, setIsSignalError] = useState<boolean>(false);

  if (enabled && !isSignalError) {
    const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;

    const handleError = (error?: Error) => {
      if (error) {
        setIsSignalError(true);
        console.error(error);
      }
    };

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${ENV_URL}/modbusHub`)
      .build();

    connection.on(method, onMessageRecieve);

    connection.onclose(handleError);
    connection.onreconnecting(handleError);
    connection.start().catch(handleError);
  }

  return { isSignalError };
};
