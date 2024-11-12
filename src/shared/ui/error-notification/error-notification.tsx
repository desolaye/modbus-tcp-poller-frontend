import { useEffect, useRef, useState } from "react";

import { useWindowFocus } from "../../lib/use-window-focus";

import cls from "./error-notification.module.css";

type ErrorNotificationProps = {
  isError?: boolean;
};

export const ErrorNotification = (props: ErrorNotificationProps) => {
  const { isError } = props;

  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isClicked, setIsClicked] = useState(false);

  const focused = useWindowFocus();

  useEffect(() => {
    if (isClicked) {
      if (isError && !focused) {
        document.title = "Ошибка УКУ!";

        audioRef.current?.play();

        intervalRef.current = setInterval(() => {
          audioRef.current?.play();
        }, 2500);
      }

      if (focused && intervalRef.current) {
        document.title = "Modbus TCP Poller";
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isError, focused]);

  return (
    <button
      className={cls.button}
      style={{ display: isClicked ? "none" : "block" }}
      onClick={() => setIsClicked(true)}
    >
      <audio
        ref={audioRef}
        controls
        src="/error.wav"
        style={{ display: "none" }}
      />
      Нажмите для включения звуковых уведомлений об ошибках
    </button>
  );
};
