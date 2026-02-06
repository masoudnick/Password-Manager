import { ArrowLeft01Icon } from "hugeicons-react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Modal, Input, Loading, Image } from "@components";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { passwordService } from "../services";
import { useAlert, useTheme, usePassword } from "@context";
import type { Password } from "@types";

type FormValues = {
  username: string;
  password: string;
  site: string;
};

const Main = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    modal: false,
    password: false,
  });

  const [setAlert] = useAlert();

  const [theme] = useTheme();

  const [passwords, setPasswords] = usePassword();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: { site: "", username: "", password: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading((prev) => ({ ...prev, modal: true }));
    const res = await passwordService.create({ ...data });
    if (res.ok) {
      setAlert({ message: t("passwordSaved"), show: true });
      fetchPasswords();
      setIsOpen(false);
    } else {
      setAlert({ message: t("error"), show: true });
    }
    setValue("site", "");
    setValue("username", "");
    setValue("password", "");
    setLoading((prev) => ({ ...prev, modal: false }));
  };

  const fetchPasswords = async () => {
    setLoading((prev) => ({ ...prev, ["password"]: true }));
    try {
      const res = await passwordService.read();
      setPasswords({ original: res.data, filtered:[], isSearch: false });
    } catch {
      setAlert({ message: t("error"), show: true });
    } finally {
      setLoading((prev) => ({ ...prev, ["password"]: false }));
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  return (
    <>
      <section className="flex items-center">
        <h2 className="grow text-xl">{t("password")}</h2>
        <button className="btn" type="button" onClick={() => setIsOpen(true)}>
          {t("add")}
        </button>
      </section>
      {!loading.password ? (
        (
          passwords.isSearch
            ? passwords.filtered.length
            : passwords.original.length
        ) ? (
          <section className="rounded-lg overflow-hidden bg-[var(--element-bg-color)] mt-8">
            <ul>
              {
                (passwords.isSearch
                  ? passwords.filtered
                  : passwords.original).map((password: Password) => (
                <li
                  key={password.id}
                  className={clsx(
                    "relative hover:bg-[var(--element-hover-color)] duration-150 before:absolute before:bottom-0 before:left-0 before:right-0 before:w-5/6 before:h-px before:bg-[var(--element-bg-color)] before:mx-auto last:before:hidden",
                    passwords.isSearch
                      ? "before:content-['']"
                      : "before:hidden"
                )}
                >
                  <Link
                    to={`/${password.site}`}
                    className="flex items-center py-3 px-3.5 w-full"
                    state={{ site: password.site, id: password.id }}
                  >
                    <Image
                      className="me-3 shrink-0"
                      src={password.icon}
                      width="16"
                      height="16"
                      alt="twitter"
                    />
                    <div className="flex grow">
                      <p className="grow text-start">
                        <span>{password.site}</span>
                      </p>
                      <ArrowLeft01Icon
                        className="cursor-pointer rounded-full hover:bg-[var(--element-hover-color)]"
                        size={"20px"}
                        strokeWidth="1"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <div className="flex items-center flex-col mt-7">
            <svg
              width="64"
              height="41"
              viewBox="0 0 64 41"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                <ellipse
                  fill={theme === "dark" ? "#272727" : "#f5f5f5"}
                  cx="32"
                  cy="33"
                  rx="32"
                  ry="7"
                ></ellipse>
                <g
                  fillRule="nonzero"
                  stroke={theme === "dark" ? "#3e3e3e" : "#d9d9d9"}
                >
                  <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                  <path
                    d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                    fill={theme === "dark" ? "#1d1d1d" : "#fafafa"}
                  ></path>
                </g>
              </g>
            </svg>
            <p className="mt-2.5">
              {passwords.isSearch ? t("notFoundPassword") : t("noPassword")}
            </p>
          </div>
        )
      ) : (
        <div className="flex justify-center mt-5">
          <Loading className="mr-3 color-[var(--body-text-color)] size-7" />
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header={t("newPassword")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("site", {
              required: t("requireSite"),
              pattern: {
                value: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i,
                message: t("invalidSite"),
              },
            })}
            id="site"
            error={errors.site}
            type="text"
            label={t("site")}
            placeholder="example.com"
            readOnly={false}
            autoFocus
          />

          <Input
            {...register("username", { required: t("requiredUsername") })}
            id="username"
            error={errors.username}
            label={t("username")}
            type="text"
            readOnly={false}
          />

          <Input
            {...register("password", { required: t("requiredPassword") })}
            id="password"
            error={errors.password}
            label={t("password")}
            type="password"
            autoComplete="new-password"
            readOnly={false}
          />

          <div className="flex gap-x-2 mt-10">
            <button
              className="btn px-4 py-1 rounded flex items-center"
              type="submit"
              disabled={
                watch("site") &&
                watch("username") &&
                watch("password") &&
                !loading.modal
                  ? false
                  : true
              }
            >
              {t("save")}
              {loading.modal ? (
                <Loading className="mr-2 color-[var(--body-text-color)] size-4" />
              ) : null}
            </button>
            <button
              className="btn px-4 py-1 rounded"
              onClick={() => setIsOpen(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Main;
