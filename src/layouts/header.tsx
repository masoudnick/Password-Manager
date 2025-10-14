import { Search01Icon, CancelCircleIcon } from "hugeicons-react";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
    const [value, setValue] = useState<string>("");
    const { t } = useTranslation();
  return (
    <header className="mb-5">
      <label
        className="flex items-center relative bg-[#282828] rounded-full cursor-text outline-2 outline-transparent outline-offset-1 ps-2 pe-3 py-1.5 hover:bg-[#e3e3e314] focus-within:outline-primary"
        htmlFor="search"
      >
        <Search01Icon
          className="p-1.5 cursor-pointer rounded-full hover:bg-[var(--ripple-bg)]"
          size={"26px"}
          strokeWidth="2"
        />
        <input
          className="grow-1 ms-1.5 text-xs"
          id="search"
          type="text"
          placeholder={t('headerSearchPlaceholder')}
          autoComplete="off"
          onChange={(e)=> setValue(e.target.value)}
          value={value}
        />
        <CancelCircleIcon
          className={clsx("cursor-pointer transition duration-150 opacity-0 invisible", value && "opacity-100 visible")}
          size={"18px"}
          strokeWidth="2"
          onClick={()=> setValue("")}
        />
      </label>
    </header>
  );
};

export default Header;
