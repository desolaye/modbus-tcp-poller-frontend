export const putConfirmModbusDeviceError = async (
  id: string,
  isConfirmed: string
) => {
  try {
    const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;
    const params = new URLSearchParams({ id, isConfirmed }).toString();

    const response = await fetch(
      ENV_URL + "/api/ModbusDevices/warning?" + params,
      {
        method: "PUT",
      }
    );

    if (response.status >= 400) throw new Error();
  } catch (err) {
    throw err;
  }
};
