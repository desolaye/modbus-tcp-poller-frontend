export const deleteModbusDeviceById = async (id: number) => {
  try {
    const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;
    await fetch(ENV_URL + "/api/ModbusDevices/" + id, {
      method: "DELETE",
    });
  } catch (err) {
    throw err;
  }
};
