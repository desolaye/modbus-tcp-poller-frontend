import { ModalScreen } from "@/shared/ui/modal-screen";
import { ErrorNotification } from "@/shared/ui/error-notification";
import { Tooltip } from "@/shared/ui/tooltip";

import {
  ModbusDevice,
  ModbusDeviceCreator,
  ModbusDeviceDelete,
} from "@/entities/modbus-device";
import { JournalButton } from "@/entities/journal";

import { useMainPage } from "../lib/use-main-page";

export const MainPage = () => {
  const { values, handlers } = useMainPage();

  return (
    <article className="main_page">
      {values.isSignalError && (
        <Tooltip isError>
          Ошибка чтения новых сообщений с сервера
          <br />
          Подключаемся заново...
        </Tooltip>
      )}

      <section>
        <header className="grid_row header_row">
          <ModbusDeviceCreator
            onClick={handlers.setSelectedDeviceId}
            onSuccess={handlers.onSuccessMutate}
            open={typeof values.selectedDeviceId === "number"}
            deviceId={values.selectedDeviceId}
          />
          <p className="header_cell">ID устройства</p>
          <p className="header_cell">IP адрес</p>
          <p className="header_cell">Порт</p>
          <p className="header_cell">Имя устройства</p>
          <p className="header_cell">Регистр</p>
          <JournalButton />
        </header>

        {values.isFetchLoading && (
          <Tooltip>Список устройств загружается...</Tooltip>
        )}

        {values.isFetchError && (
          <Tooltip isError>Ошибка загрузки списка устройств</Tooltip>
        )}

        {!values.isFetchError &&
          !values.isFetchLoading &&
          !Boolean(values.data?.length) && (
            <Tooltip>
              Список устройств пустой. Добавьте первое устройство
            </Tooltip>
          )}

        <main>
          {values.data?.map((device) => (
            <ModbusDevice
              key={device.id}
              deviceData={device}
              pollData={handlers.selectPoll(device)}
              onAction={handlers.onRowAction}
            />
          ))}
        </main>
      </section>

      <ModalScreen
        open={typeof values.deletingDevice !== "undefined"}
        onClose={() => handlers.setDeletingDevice(undefined)}
      >
        <ModbusDeviceDelete
          onSuccess={handlers.onSuccessMutate}
          device={values.deletingDevice!}
        />
      </ModalScreen>

      <ErrorNotification isError={values.isDeviceError} />
    </article>
  );
};
