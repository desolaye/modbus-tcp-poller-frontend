import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";

import { ModbusDevicePollType } from "@/entities/modbus-device";

type UseSignalRProps = {
  method: string;
  enabled?: boolean;
  onMessageRecieve: (data: ModbusDevicePollType) => void;
};

export const useSignalR = (props: UseSignalRProps) => {
  const { method, enabled = true, onMessageRecieve } = props;

  const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;

  const [isSignalError, setIsSignalError] = useState(false);
  const connection = useRef<signalR.HubConnection | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleError = (err?: Error) => {
    if (err) {
      setIsSignalError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSignalError) {
      timeout.current = setTimeout(() => {
        setIsSignalError(false);
      }, 5000);
    }

    if (enabled && !isSignalError) {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }

      connection.current = new signalR.HubConnectionBuilder()
        .withUrl(`${ENV_URL}/modbusHub`)
        .build();

      connection.current.on(method, onMessageRecieve);
      connection.current.onclose(handleError);
      connection.current.onreconnecting(handleError);
      connection.current.start().catch(handleError);
    }
  }, [isSignalError, enabled]);

  return { isSignalError };
};
