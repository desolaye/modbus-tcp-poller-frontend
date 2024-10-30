import { useState } from "react";

import { useFetch } from "@/shared/lib/use-fetch";
import { useMutate } from "@/shared/lib/use-mutate";
import { useSignalR } from "@/shared/lib/use-signal-r";

import {
  ModbusDevicePollMapType,
  ModbusDevicePollType,
  ModbusDeviceType,
  postAddModbusDevice,
  getAllModbusDevices,
} from "@/entities/modbus-device";

export const useMainPage = () => {
  const [pollData, setPollData] = useState<ModbusDevicePollMapType>({});

  const onMessageRecieve = (poll: ModbusDevicePollType) => {
    setPollData((prev) => ({ ...prev, [String(poll.deviceId)]: poll }));
  };

  const selectPollData = (device: ModbusDeviceType) => pollData[device.id];

  const sortByWarning = (
    polls: ModbusDevicePollMapType,
    devices?: ModbusDeviceType[]
  ) => {
    const array = devices || [];

    const warnings = array.filter(
      (v) => Boolean(polls[v.id]) && Boolean(polls[v.id]?.isWarning)
    );

    const pendings = array.filter((v) => !Boolean(polls[v.id]));

    const normals = array.filter(
      (v) => Boolean(polls[v.id]) && !Boolean(polls[v.id]?.isWarning)
    );

    return [...warnings, ...pendings, ...normals];
  };

  const { data, isError, isLoading, refetch } = useFetch({
    fn: getAllModbusDevices,
  });

  const {
    mutateAsync,
    isError: isErrorMutate,
    isLoading: isLoadingMutate,
  } = useMutate({
    fn: (device: ModbusDeviceType) => postAddModbusDevice(device),
    onSuccess: () => refetch(),
  });

  const { isSignalError } = useSignalR({
    method: "ReceiveData",
    enabled: !isError && !isLoading,
    onMessageRecieve,
  });

  return {
    values: {
      data: sortByWarning(pollData, data),
      isError,
      isSignalError,
      isErrorMutate,
      isLoadingMutate,
      isLoading,
    },
    handlers: {
      selectPollData,
      mutateAsync,
    },
  };
};
