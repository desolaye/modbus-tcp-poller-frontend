import { ModbusDevice } from "@/entities/modbus-device";
import { useMainPage } from "../lib/use-main-page";

export const MainPage = () => {
  const { values } = useMainPage();

  return (
    <article>
      <header>
        <h1>Проверка состояния УКУ</h1>
      </header>

      <main>
        {values.isError && <p>Ошибка загрузки списка УКУ</p>}
        {values.isLoading && <p>Список УКУ загружается...</p>}

        {values.data?.map((device) => (
          <ModbusDevice key={device.id} deviceData={device} />
        ))}
      </main>
    </article>
  );
};
