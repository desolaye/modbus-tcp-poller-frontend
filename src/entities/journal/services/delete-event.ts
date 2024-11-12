export const deleteEvent = async (id: string) => {
  try {
    const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;
    const url = `${ENV_URL}/api/Events/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.status >= 400) throw new Error();
  } catch (err) {
    throw err;
  }
};
