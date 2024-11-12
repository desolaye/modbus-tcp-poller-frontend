import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";

import cls from "./modal-screen.module.css";

type ModalScreenProps = PropsWithChildren<{
  onClose: () => void;
  open?: boolean;
  pos?: "center" | "right";
}>;

export const ModalScreen = (props: ModalScreenProps) => {
  const { children, open, pos = "center", onClose } = props;

  if (!open) return null;

  const modalEl = document.getElementById("modal");
  if (!modalEl) throw new Error("No modal container in index.html");

  const containterCn = cn(cls.modal, { [cls.modal_center]: pos === "center" });

  const contentCn = cn(cls.modal_content, {
    [cls.content_center]: pos === "center",
    [cls.content_right]: pos === "right",
  });

  return createPortal(
    <section className={containterCn} onMouseDown={() => onClose()}>
      <div className={contentCn} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </section>,
    modalEl
  );
};
