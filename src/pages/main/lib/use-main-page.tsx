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
  const [deletingDevice, setDeletingDevice] = useState<ModbusDeviceType>();

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
    setDeletingDevice(undefined);
  };

  const { isSignalError } = useSignalR({
    method: "ReceiveData",
    enabled: !isError && !isLoading,
    onMessageRecieve,
  });

  const onAction = (device: ModbusDeviceType, isDelete?: boolean) => {
    isDelete ? setDeletingDevice(device) : setSelectedDeviceId(device.id);
  };

  return {
    values: {
      data: sortModbusDevices(pollData, data),
      isError,
      isSignalError,
      isLoading,
      selectedDeviceId,
      deletingDevice,
    },
    handlers: {
      onSuccessMutate,
      setSelectedDeviceId,
      setDeletingDevice,
      selectPollData,
      onAction,
    },
  };
};
