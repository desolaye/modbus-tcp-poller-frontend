import { useEffect, useState } from "react";

import { useFetch } from "@/shared/lib/use-fetch";
import { useMutate } from "@/shared/lib/use-mutate";
import { useSignalR } from "@/shared/lib/use-signal-r";

import {
  ModbusDevicePollMapType,
  ModbusDevicePollType,
  ModbusDeviceType,
  getAllModbusDevices,
  sortModbusDevices,
  putConfirmModbusDeviceError,
} from "@/entities/modbus-device";

export const useMainPage = () => {
  const [pollData, setPollData] = useState<ModbusDevicePollMapType>({});
  const [lastPollData, setLastPollData] = useState<ModbusDevicePollType>();
  const [errorIPs, setErrorIPs] = useState<string[]>([]);

  const [deletingDevice, setDeletingDevice] = useState<ModbusDeviceType>();
  const [selectedDeviceId, setSelectedDeviceId] = useState<number>();

  const onSuccessMutate = () => {
    refetch();
    setSelectedDeviceId(undefined);
    setDeletingDevice(undefined);
  };

  const {
    data,
    isError: isFetchError,
    isLoading: isFetchLoading,
    refetch,
  } = useFetch({
    fn: getAllModbusDevices,
  });

  const {
    isError: isConfirmError,
    isLoading: isConfirmLoading,
    mutateAsync: confirmError,
  } = useMutate({
    fn: ({ id, isConfirmed }: { id: string; isConfirmed: string }) =>
      putConfirmModbusDeviceError(id, isConfirmed),
    onSuccess: onSuccessMutate,
  });

  const onMessageRecieve = (poll: ModbusDevicePollType) => {
    setPollData((prev) => ({ ...prev, [String(poll.ipAddress)]: poll }));
    setLastPollData(poll);
  };

  const { isSignalError } = useSignalR({
    method: "ReceiveData",
    onMessageRecieve: onMessageRecieve,
  });

  const onAction = (device: ModbusDeviceType, actionType: string) => {
    if (actionType === "delete") setDeletingDevice(device);
    else if (actionType === "edit") setSelectedDeviceId(device.id);
    else if (actionType === "confirmError") {
      setErrorIPs((prev) => prev.filter((v) => v !== device.ipAddress));
      confirmError({ id: String(device.id), isConfirmed: "true" });
    }
  };

  const selectPoll = (device: ModbusDeviceType) => pollData[device.ipAddress];

  useEffect(() => {
    const device = data?.find((v) => v.ipAddress === lastPollData?.ipAddress);
    console.log(device);

    if (device && lastPollData) {
      if (!device.isConfirmed && lastPollData.isWarning) {
        setErrorIPs((prev) => [...prev, device.ipAddress]);
      }

      if (device.isConfirmed && !lastPollData.isWarning) {
        confirmError({ id: String(device.id), isConfirmed: "false" });
      }
    }
  }, [lastPollData]);

  return {
    values: {
      data: sortModbusDevices(pollData, data),
      isFetchError,
      isFetchLoading,
      isConfirmLoading,
      selectedDeviceId,
      deletingDevice,
      isSignalError,
      isDeviceError: Boolean(errorIPs.length),
      isConfirmError,
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
