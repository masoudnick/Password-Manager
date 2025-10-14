import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

type AlertProps = {
  message: string;
  setMessage: Dispatch<SetStateAction<{ message: string; }>>;
  timeOut?: number;
};

const Alert = ({ message, setMessage, timeOut = 3000 }: AlertProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
      setTimeout(() => {
        // setMessage({message: ""});
        alertRef.current?.remove();
      }, 400);
      
    }, timeOut);
    return () => clearTimeout(timer);
  }, [message, setMessage, timeOut]);

  if (message === "") return null;
  return ReactDOM.createPortal(
    <div
      className={clsx(
        "rounded-md p-4 fixed top-8 right-1/2 w-80 translate-x-1/2 flex items-center justify-center bg-white/40 z-10 transition-all duration-400 ease-in-out",
        showAlert ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
      ref={alertRef}
    >
      {message}
    </div>,
    document.body
  );
};

export { Alert };
export type { AlertProps };
