import { useState } from "react";
import cn from "classnames";

import { useFetch } from "@/shared/lib/use-fetch";
import { Tooltip } from "@/shared/ui/tooltip";

import { getEventsAll } from "../services/get-events-all";
import cls from "./journal.module.css";
import { JournalEvent } from "./journal-event";
import { useMutate } from "@/shared/lib/use-mutate";
import { deleteEvent } from "../services/delete-event";

const LIMIT = 10;

export const Journal = () => {
  const [page, setPage] = useState(1);
  const params = { skip: (page - 1) * LIMIT, limit: LIMIT };

  const {
    data,
    isError: isFetchError,
    isLoading: isFetchLoading,
    refetch,
  } = useFetch({
    fn: () => getEventsAll(params),
    keys: [page],
  });

  const {
    isError: isDeleteError,
    isLoading: isDeleteLoading,
    mutateAsync: deleteJournalEvent,
  } = useMutate({
    fn: deleteEvent,
    onSuccess: refetch,
  });

  const headerClasses = cn(cls.grid_row, cls.header_row);

  return (
    <section className={cls.journal}>
      <header className={headerClasses}>
        <p className={cls.header_cell}>IP адрес</p>
        <p className={cls.header_cell}>Ошибка</p>
        <p className={cls.header_cell}>Дата</p>
      </header>

      <main>
        {data?.items.map((evt) => (
          <JournalEvent
            key={evt.createdAt}
            event={evt}
            deleteDisabled={isDeleteLoading}
            onDelete={() => deleteJournalEvent(String(evt.id))}
          />
        ))}
      </main>

      <footer>
        {isFetchLoading && <Tooltip>Загружаем журнал...</Tooltip>}

        {!isFetchLoading && isFetchError && (
          <Tooltip isError>Ошибка загрузки журнала</Tooltip>
        )}

        {isDeleteError && <Tooltip isError>Ошибка удаления события</Tooltip>}

        {!Boolean(data?.items.length) && !isFetchError && !isFetchLoading && (
          <Tooltip>
            Журнал пуст
            <br />
            События об ошибках будут находиться здесь
          </Tooltip>
        )}
      </footer>

      <nav className={cls.journal_nav}>
        <button
          className="button_primary circle"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          {"<"}
        </button>
        <p style={{ fontSize: "20px" }}>{page}</p>
        <button
          className="button_primary circle"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * LIMIT > (data?.totalCount || 0)}
        >
          {">"}
        </button>
      </nav>
    </section>
  );
};
