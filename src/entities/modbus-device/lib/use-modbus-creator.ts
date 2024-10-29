import { ChangeEvent, FormEvent, useState } from "react";

import {
  ModbusDeviceFormType,
  ModbusDeviceType,
} from "../model/modbus-device.schema";

import { isFormInvalid } from "../utils/is-form-invalid";
import { formDeviceToModbusDevice } from "../utils/form-device-to-modbus-device";

type UseModbusCreatorProps = {
  onMutate: (device: ModbusDeviceType) => void;
};

export const useModbusCreator = ({ onMutate }: UseModbusCreatorProps) => {
  const initialDevice = {
    id: "",
    ipAddress: "",
    port: "",
    registerAddress: "",
    registerName: "",
  };

  const [isCreating, setIsCreating] = useState(false);
  const [isFormError, setIsFormError] = useState(false);

  const [device, setDevice] = useState<ModbusDeviceFormType>({
    ...initialDevice,
  });

  const reset = () => {
    setIsCreating(false);
    setIsFormError(false);
    setDevice({ ...initialDevice });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    isFormInvalid(device)
      ? setIsFormError(true)
      : onMutate(formDeviceToModbusDevice(device));
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFormError(false);

    const { name, value } = e.target;
    if (name in device) setDevice((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values: {
      device,
      isCreating,
      isFormError,
    },
    handlers: {
      setIsCreating,
      reset,
      submit,
      change,
    },
  };
};
