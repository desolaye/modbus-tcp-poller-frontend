import { useEffect, useState } from "react";

import { useFetch } from "@/shared/lib/use-fetch";
import { useMutate } from "@/shared/lib/use-mutate";
import { useSignalR } from "@/shared/lib/use-signal-r";

import {
  ModbusDevicePollMapType,
  ModbusDeviceType,
  getAllModbusDevices,
  sortModbusDevices,
  putConfirmModbusDeviceError,
} from "@/entities/modbus-device";

export const useMainPage = () => {
  const [pollData, setPollData] = useState<ModbusDevicePollMapType>({});
  const [errorIPs, setErrorIPs] = useState<string[]>([]);

  const [deletingDevice, setDeletingDevice] = useState<ModbusDeviceType>();
  const [selectedDeviceId, setSelectedDeviceId] = useState<number>();

  const onSuccessMutate = (ipAddress?: string) => {
    refetch();
    setSelectedDeviceId(undefined);
    setDeletingDevice(undefined);

    if (ipAddress) setErrorIPs((prev) => prev.filter((v) => v !== ipAddress));
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

  const { data: receiveData, isSignalError } = useSignalR({
    method: "ReceiveData",
  });

  const onRowAction = (device: ModbusDeviceType, actionType: string) => {
    if (actionType === "delete") setDeletingDevice(device);
    else if (actionType === "edit") setSelectedDeviceId(device.id);
    else if (actionType === "confirmError") {
      setErrorIPs((prev) => prev.filter((v) => v !== device.ipAddress));
      confirmError({ id: `${device.id}`, isConfirmed: "true" });
    }
  };

  const selectPoll = (device: ModbusDeviceType) => pollData[device.ipAddress];

  useEffect(() => {
    const device = data?.find((v) => v.ipAddress === receiveData?.ipAddress);

    if (device && receiveData) {
      setPollData((prev) => ({
        ...prev,
        [receiveData.ipAddress]: receiveData,
      }));

      if (device.isConfirmed && !receiveData.isWarning) {
        setErrorIPs((prev) => prev.filter((v) => v !== device.ipAddress));
      }

      if (!device.isConfirmed && receiveData.isWarning) {
        setErrorIPs((prev) => [...prev, device.ipAddress]);
      }

      if (device.isConfirmed && !receiveData.isWarning) {
        confirmError({ id: `${device.id}`, isConfirmed: "false" });
      }
    }
  }, [receiveData]);

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
      onRowAction,
    },
  };
};
