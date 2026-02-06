import { ArrowLeft02Icon } from "hugeicons-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Loading, Modal, Image } from "@components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { passwordService } from "../services";
import { clsx } from "clsx";
import { getRootDomain } from "../utilities";
import { useAlert } from "@context";
import type { Password } from "@types";

type Inputs = {
  username: string;
  password: string;
  id: number;
};

const PasswordItem = () => {
  const [setAlert] = useAlert();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    modal: false,
    password: false,
  });

  const [passwords, setPasswords] = useState<Password[]>([]);

  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading((prev) => ({ ...prev, modal: true }));
    const res = await passwordService.update(data);
    setIsOpen(false);
    if (res.ok) {
      setAlert({ message: t("passwordEdited"), show: true });
    } else {
      setAlert({ message: t("error"), show: true });
    }
    setLoading((prev) => ({ ...prev, modal: false }));
  };

  const fetchPasswords = async () => {
    const site: string = location.state.site;
    const res = await passwordService.read(site);
    if (res.ok) {
      setPasswords(res.data);
    }
  };

  const deletePassword = async () => {
    setLoading((prev) => ({ ...prev, modal: true }));
    const id: number = location.state.id;
    const res = await passwordService.delete(id);

    if (res.ok) {
      setAlert({ message: t("passwordSaved"), show: true });
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } else {
      setAlert({ message: t("error"), show: true });
    }
  };

  const handleEditPassword = (
    id: number,
    username: string,
    password: string
  ) => {
    setValue("id", id);
    setIsOpen(true);
    setValue("username", username);
    setValue("password", password);
  };

  useEffect(() => {
    fetchPasswords();
  }, [isOpen]);

  return (
    <>
      <section className="flex mb-5 items-center flex-row-reverse justify-between">
        <ArrowLeft02Icon
          onClick={() => navigate(-1)}
          className="p-1 cursor-pointer rounded-full ms-1.5 hover:bg-[var(--element-hover-color)]"
          size={"30px"}
          strokeWidth="2"
        />
        <div className="flex items-center gap-x-2">
          <Image
            width="20"
            height="20"
            src={""}
            alt={getRootDomain(location.state.site)}
          />
          <h2 className="text-lg">{getRootDomain(location.state.site)}</h2>
        </div>
      </section>
      {passwords.map((site, index) => (
        <div
          key={site.id}
          className={clsx(
            "rounded-xl bg-[var(--element-bg-color)]",
            index != passwords.length && "mb-5"
          )}
        >
          <div className="grid grid-cols-2 p-5 gap-x-4 gap-y-5">
            <Input
              label={t("username")}
              id={`username-` + site.id}
              type="text"
              readOnly={true}
              value={site.username}
            />
            <Input
              label={t("password")}
              id={`password-` + site.id}
              type="password"
              autoComplete="new-password"
              readOnly={true}
              value={site.password}
            />
          </div>
          <div className="py-4 px-5 border-t border-[var(--element-hover-color)]">
            <button
              className="btn me-3"
              onClick={() =>
                handleEditPassword(site.id, site.username, site.password)
              }
            >
              {t("edit")}
            </button>
            <button className="btn" onClick={deletePassword}>
              {t("delete")}
            </button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header={t("editPassword")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("id")} id="id" type="hidden" readOnly={false} />
          <Input
            {...register("username", { required: t("requiredUsername") })}
            id="username"
            error={errors.username}
            label={t("username")}
            type="text"
            readOnly={false}
            autoComplete="new-password"
            data-lpignore="true"
            data-form-type="other"
            autoFocus
          />
          <Input
            {...register("password", { required: t("requiredPassword") })}
            id="password"
            error={errors.password}
            label={t("password")}
            type="password"
            autoComplete="new-password"
            data-lpignore="true"
            data-form-type="other"
            readOnly={false}
          />
          <div className="flex gap-x-2 mt-2">
            <button
              className="btn px-4 py-2 rounded flex items-center"
              type="submit"
              disabled={
                errors.username || errors.password || loading.modal
                  ? true
                  : false
              }
            >
              {t("save")}
              {loading.modal ? (
                <Loading className="mr-2 color-[var(--body-text-color)] size-4" />
              ) : null}
            </button>
            <button
              className="btn px-4 py-2 rounded"
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

export default PasswordItem;
