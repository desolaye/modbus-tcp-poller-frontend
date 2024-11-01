import { useState } from "react";

import { useFetch } from "@/shared/lib/use-fetch";
import { useSignalR } from "@/shared/lib/use-signal-r";

import {
  ModbusDevicePollMapType,
  ModbusDevicePollType,
  ModbusDeviceType,
  getAllModbusDevices,
  sortModbusDevices,
} from "@/entities/modbus-device";

export const useMainPage = () => {
  const [pollData, setPollData] = useState<ModbusDevicePollMapType>({});
  const [selectedDeviceId, setSelectedDeviceId] = useState<number>();
  const [deletingDeviceId, setDeletingDeviceId] = useState<number>();

  const onMessageRecieve = (poll: ModbusDevicePollType) => {
    setPollData((prev) => ({ ...prev, [String(poll.deviceId)]: poll }));
  };

  const selectPollData = (device: ModbusDeviceType) => pollData[device.id];

  const { data, isError, isLoading, refetch } = useFetch({
    fn: getAllModbusDevices,
  });

  const onSuccessMutate = () => {
    refetch();
    setSelectedDeviceId(undefined);
    setDeletingDeviceId(undefined);
  };

  const { isSignalError } = useSignalR({
    method: "ReceiveData",
    enabled: !isError && !isLoading,
    onMessageRecieve,
  });

  const onAction = (id: number, isDelete?: boolean) => {
    isDelete ? setDeletingDeviceId(id) : setSelectedDeviceId(id);
  };

  return {
    values: {
      data: sortModbusDevices(pollData, data),
      isError,
      isSignalError,
      isLoading,
      selectedDeviceId,
      deletingDeviceId,
    },
    handlers: {
      onSuccessMutate,
      setSelectedDeviceId,
      setDeletingDeviceId,
      selectPollData,
      onAction,
    },
  };
};
