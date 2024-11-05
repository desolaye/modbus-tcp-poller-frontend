import { useState } from "react";

import { useFetch } from "@/shared/lib/use-fetch";
import { useSignalR } from "@/shared/lib/use-signal-r";

import {
  ModbusDevicePollMapType,
  ModbusDeviceType,
  getAllModbusDevices,
  sortModbusDevices,
} from "@/entities/modbus-device";

export const useMainPage = () => {
  const [pollData, setPollData] = useState<ModbusDevicePollMapType>({});
  const [selectedDeviceId, setSelectedDeviceId] = useState<number>();
  const [deletingDevice, setDeletingDevice] = useState<ModbusDeviceType>();

  const selectPoll = (device: ModbusDeviceType) => pollData[device.ipAddress];

  const { data, isError, isLoading, refetch } = useFetch({
    fn: getAllModbusDevices,
  });

  const onSuccessMutate = () => {
    refetch();
    setSelectedDeviceId(undefined);
    setDeletingDevice(undefined);
  };

  const { isSignalError } = useSignalR({
    method: "ReceiveData",
    enabled: !isLoading && !isError,
    onMessageRecieve: (poll) => {
      setPollData((prev) => ({ ...prev, [String(poll.ipAddress)]: poll }));
    },
  });

  const onAction = (device: ModbusDeviceType, isDelete?: boolean) => {
    isDelete ? setDeletingDevice(device) : setSelectedDeviceId(device.id);
  };

  return {
    values: {
      data: sortModbusDevices(pollData, data),
      isError,
      isLoading,
      selectedDeviceId,
      deletingDevice,
      isSignalError,
    },
    handlers: {
      onSuccessMutate,
      setSelectedDeviceId,
      setDeletingDevice,
      selectPoll,
      onAction,
    },
  };
};
