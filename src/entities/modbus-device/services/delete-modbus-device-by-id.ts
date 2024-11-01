export const deleteModbusDeviceById = async (id: number) => {
  try {
    const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;
    const response = await fetch(ENV_URL + "/api/ModbusDevices/" + id, {
      method: "DELETE",
    });

    if (response.status >= 400) throw new Error();
  } catch (err) {
    throw err;
  }
};
