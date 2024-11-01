import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type ModalScreenProps = PropsWithChildren<{
  onClose: () => void;
  open?: boolean;
}>;

export const ModalScreen = (props: ModalScreenProps) => {
  const { children, open, onClose } = props;

  if (!open) return null;

  const modalEl = document.getElementById("modal");
  if (!modalEl) throw new Error("No modal container in index.html");

  return createPortal(
    <section className="modal" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </section>,
    modalEl
  );
};
