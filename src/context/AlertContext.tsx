import { createContext, useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

type AlertType = {
  message?: string;
  show?: boolean;
};

type AlertContextType = [React.Dispatch<React.SetStateAction<AlertType>>];

type AlertProviderProps = {
  children: React.ReactNode;
};

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<AlertType>({ message: "", show: false });

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  return ReactDOM.createPortal(
    <AlertContext value={[setAlert]}>
      {children}
      <div
        className={clsx(
          "rounded-md p-4 fixed top-8 right-1/2 w-80 translate-x-1/2 flex items-center justify-center bg-[var(--body-text-color)] text-[var(--body-bg-color)] transition-all duration-400 ease-in-out z-10",
          alert.show
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        )}
      >
        {alert.message}
      </div>
    </AlertContext>,
    document.body
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be inside AlertProvider");
  return ctx;
};
