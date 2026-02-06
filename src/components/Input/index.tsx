import { ViewIcon, ViewOffSlashIcon, Copy01Icon } from "hugeicons-react";
import { FieldError } from "react-hook-form";
import { useState, useRef } from "react";
import { useAlert } from "../../context";
import clsx from "clsx";
import "./style.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
  readOnly: boolean;
  error?: FieldError;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ label, error, type, readOnly, ...props }: InputProps) => {
  const [setAlert] = useAlert();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const showHidePassword = () => setShowPassword((prev) => !prev);

  const copyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setAlert({ message: "کپی شد!", show: true });
    }
  };

  return type === "hidden" ? (
    <input
      className="form-control text-xs relative py-2.5 w-full placeholder:text-[#e3e3e3]"
      name={props.id}
      type={type}
      readOnly={readOnly}
      ref={inputRef}
      {...props}
    />
  ) : (
    <div className="mb-4">
      {label ? (
        <label htmlFor={props.id} className="text-sm mb-2 block">
          {label}
        </label>
      ) : null}
      <div
        className={clsx(
          "relative flex items-center bg-[var(--element-bg-color)] px-2.5 pe-1.5 gap-x-1",
          error ? "border-red-400" : "border-gray-200",
          readOnly ? "rounded-lg" : "rounded-t-lg border-b"
        )}
      >
        <input
          className="form-control text-xs relative py-2.5 w-full placeholder:text-[#e3e3e3]"
          name={props.id}
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
            className="cursor-pointer rounded-md hover:bg-[var(--element-hover-color)]"
            type="button"
            onClick={showHidePassword}
          >
            {showPassword ? (
              <ViewOffSlashIcon
                className="p-1"
                id="icon"
                size={"24px"}
                strokeWidth="2"
              />
            ) : (
              <ViewIcon
                className="p-1"
                id="icon"
                size={"24px"}
                strokeWidth="2"
              />
            )}
          </button>
        ) : null}
        {readOnly ? (
          <button
            className="cursor-pointer rounded-md hover:bg-[var(--element-hover-color)]"
            type="button"
            onClick={copyToClipboard}
          >
            <Copy01Icon className="p-1" size={"24px"} strokeWidth="2" />
          </button>
        ) : null}
      </div>
      {error && <p className="mt-1 text-red-400 text-xs">{error.message}</p>}
    </div>
  );
};

export default Input;
