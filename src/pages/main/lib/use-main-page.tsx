import { useState } from "react";

import { useFetch } from "@/shared/lib/use-fetch";
import { useMutate } from "@/shared/lib/use-mutate";
import { useSignalR } from "@/shared/lib/use-signal-r";

import { getAllModbusDevicesMock } from "@/entities/modbus-device/services/get-all-modbus-devices.mock";

import {
  ModbusDevicePollMapType,
  ModbusDevicePollType,
  ModbusDeviceType,
  postAddModbusDevice,
} from "@/entities/modbus-device";

export const useMainPage = () => {
  const [pollData, setPollData] = useState<ModbusDevicePollMapType>({});
  const [device, setDevice] = useState<ModbusDeviceType>();

  const onMessageRecieve = (poll: ModbusDevicePollType) => {
    setPollData((prev) => ({ ...prev, [String(poll.deviceId)]: poll }));
  };

  const selectPollData = (device: ModbusDeviceType) => {
    return pollData[device.id];
  };

  const { data, isError, isLoading, refetch } = useFetch({
    fn: getAllModbusDevicesMock,
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
      data,
      isError,
      isSignalError,
      isLoading,
    },
    handlers: {
      selectPollData,
      mutateAsync,
    },
  };
};
