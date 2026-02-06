import { createContext, useState, useContext } from "react";
import type { Password } from "@types";

type PasswordDataType = {
    original: Password[];
    filtered: Password[];
    isSearch: boolean;
}


type PasswordContextType = [
    PasswordDataType,
  React.Dispatch<React.SetStateAction<PasswordDataType>>
];

const PasswordContext = createContext<PasswordContextType | null>(null);

export const PasswordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [passwords, setPasswords] = useState<PasswordDataType>({ original: [], filtered: [], isSearch: false });

  return (
    <PasswordContext value={[passwords, setPasswords]}>
      {children}
    </PasswordContext>
  );
};

export const usePassword = () => {
  const ctx = useContext(PasswordContext);
  if (!ctx) throw new Error("usePassword must be inside PasswordProvider");
  return ctx;
};
