import { useState } from "react";

import { ModalScreen } from "@/shared/ui/modal-screen";
import { Journal } from "./journal";

export const JournalButton = () => {
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  return (
    <>
      <button
        className="button_secondary full"
        onClick={() => setIsJournalOpen(true)}
      >
        Журнал
      </button>

      <ModalScreen
        pos="right"
        open={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
      >
        <Journal />
      </ModalScreen>
    </>
  );
};
