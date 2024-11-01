import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useFetch } from "@/shared/lib/use-fetch";
import { useMutate } from "@/shared/lib/use-mutate";

import { ModbusDeviceFormType } from "../model/modbus-device.schema";

import { isFormInvalid } from "../utils/is-form-invalid";
import { formDeviceToModbusDevice } from "../utils/form-device-to-modbus-device";
import { createInitialDevice } from "../utils/create-initial-device";

import { getModbusDeviceById } from "../services/get-modbus-device-by-id";
import { postAddModbusDevice } from "../services/post-add-modbus-device";
import { putEditModbusDevice } from "../services/put-edit-modbus-device";

type UseModbusFormProps = {
  onSuccess: () => void;
  deviceId?: number;
};

export const useModbusForm = (props: UseModbusFormProps) => {
  const { deviceId, onSuccess } = props;

  const modbus = useFetch({
    fn: () => getModbusDeviceById(deviceId!),
    enabled: Boolean(deviceId),
  });

  const mutate = useMutate({
    fn: Boolean(deviceId) ? putEditModbusDevice : postAddModbusDevice,
    onSuccess,
  });

  const inputs: { name: keyof ModbusDeviceFormType; placeholder: string }[] = [
    { name: "ipAddress", placeholder: "IP-адрес" },
    { name: "port", placeholder: "Порт (по умолч. 502)" },
    { name: "registerName", placeholder: "Имя устройства" },
    { name: "registerAddress", placeholder: "Регистр (по умолч. 60)" },
  ];

  const [isFormError, setIsFormError] = useState(false);
  const [device, setDevice] = useState(createInitialDevice());

  const reset = onSuccess;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormInvalid(device)) {
      setIsFormError(true);
    } else {
      mutate.mutateAsync(formDeviceToModbusDevice(device));
    }
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFormError(false);
    const { name, value } = e.target;
    if (name in device) setDevice((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (modbus.data) setDevice(createInitialDevice(modbus.data));
  }, [modbus.data]);

  return {
    values: {
      inputs,
      device,
      deviceId,
      modbus,
      isFormError,
      mutate,
    },
    handlers: {
      reset,
      submit,
      change,
    },
  };
};
