import cn from "classnames";

import { DeleteIcon } from "@/shared/ui/icons/delete-icon";
import { isoToTime } from "@/shared/utils/iso-to-time";

import { eventStatusToText } from "../utils/event-status-to-text";
import { EventType } from "../model/event.schema";

import cls from "./journal.module.css";

type JournalEventProps = {
  event: EventType;
  onDelete?: () => void;
  deleteDisabled?: boolean;
};

export const JournalEvent = (props: JournalEventProps) => {
  const { event, deleteDisabled, onDelete } = props;

  const classes = cn(cls.grid_row, cls.body_row);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (onDelete) onDelete();
  };

  return (
    <a
      className={classes}
      href={"http://" + event.ipAdress}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>{event.ipAdress}</p>
      <p>{eventStatusToText(event.status)}</p>
      <p>{isoToTime(event.createdAt, true)}</p>

      <button
        name="delete"
        className="button_neutral"
        style={{ padding: "2px 4px" }}
        onClick={handleClick}
        disabled={deleteDisabled}
      >
        <DeleteIcon />
      </button>
    </a>
  );
};
