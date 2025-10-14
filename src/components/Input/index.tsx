import { FieldError } from "react-hook-form";
import { ViewIcon, ViewOffSlashIcon, Copy01Icon } from "hugeicons-react";
import { useState, useRef } from "react";
import { Alert } from "../Alert";
import clsx from "clsx";
import "./style.scss";
import { useTranslation } from "react-i18next";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  readOnly: boolean;
  error?: FieldError;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ label, error, type, readOnly, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { t } = useTranslation();
  const [alert, showAlert] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const showHidePassword = () => setShowPassword((prev) => !prev);

  const copyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      showAlert({ message: t("error"), show: true });
    }
  };

  return (
    <div className="mb-4">
      <label className="text-xs mb-2 block">{label}</label>
      <div
        className={clsx(
          "relative flex items-center bg-[var(--textfield-color)] ps-2.5 pe-1 gap-x-1",
          error ? "border-red-400" : "border-gray-200",
          readOnly ? "rounded-lg" : "rounded-t-lg border-b"
        )}
      >
        <input
          className="form-control text-xs relative py-2.5 w-full placeholder:text-[#e3e3e3]"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          autoComplete="off"
          readOnly={readOnly}
          ref={inputRef}
          {...props}
        />
        {type === "password" ? (
          <button
            className="cursor-pointer rounded-full hover:bg-[var(--color-hover)]"
            type="button"
            onClick={showHidePassword}
          >
            {showPassword ? (
              <ViewOffSlashIcon
                className="p-1"
                id="icon"
                size={"26px"}
                strokeWidth="2"
              />
            ) : (
              <ViewIcon
                className="p-1"
                id="icon"
                size={"26px"}
                strokeWidth="2"
              />
            )}
          </button>
        ) : null}
        {readOnly ? (
          <button
            className="cursor-pointer rounded-full hover:bg-[var(--color-hover)]"
            type="button"
            onClick={copyToClipboard}
          >
            <Copy01Icon className="p-1" size={"26px"} strokeWidth="2" />
          </button>
        ) : null}
      </div>
      {error && <p className="mt-1 text-red-400 text-xs">{error.message}</p>}
      {alert.show && <Alert alert={alert.message} />}
    </div>
  );
};

export default Input;
