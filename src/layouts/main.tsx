import { ArrowLeft01Icon } from "hugeicons-react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Modal, Input, Loading, Alert, AlertProps } from "../components";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

type Inputs = {
  username: string;
  password: string;
  site: string;
};

type Password = {
  id: number;
  username: string;
  password: string;
  site: string;
};

type LoadingProps = {
  [key: string]: boolean;
};


const Main = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<LoadingProps>({
    modal: false,
    password: false,
  });
  const [alert, showAlert] = useState<AlertProps>({
    message: ""
  });
  const [passwords, setPasswords] = useState<Password[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onSubmit",
    defaultValues: { site: "", username: "", password: "" },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading((prev) => ({ ...prev, ["modal"]: true }));

    fetch("http://localhost/password-manager/api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading((prev) => ({ ...prev, "modal": false }));
        fetchPasswords();
        setIsOpen(false);
      })
      .catch(() => {
        showAlert({message: t("error")})
      });
  };

  const fetchPasswords = async () => {
    setLoading((prev) => ({ ...prev, ["password"]: true }));
    fetch("http://localhost/password-manager/api.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) showAlert({message: t("error")})
        setLoading((prev) => ({ ...prev, ["password"]: false }));
        setPasswords(data.status === 200 ? data.data : []);
        
      })
      .catch(() => {
        showAlert({message: t("error")})
      });
  };
  useEffect(() => {
    fetchPasswords();
  }, []);

  return (
    <main>
      <section className="flex items-center">
        <h2 className="grow text-xl">{t("password")}</h2>
        <button
          className="btn px-4 py-1"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          {t("add")}
        </button>
      </section>
      {!loading.password ? (
        passwords.length ?
        (<section className="rounded-lg overflow-hidden bg-[#292a2d] mt-8">
          <ul>
            {passwords.map((password) => (
              <li
                key={password.id}
                className={clsx("relative hover:bg-[var(--color-hover)] before:absolute before:bottom-0 before:left-0 before:right-0 before:w-5/6 before:h-px before:bg-[var(--color-hover)] before:mx-auto", passwords.length > 1 ? "before:content-['']" : "before:hidden")}
              >
                <Link
                  to={`/${password.site}`}
                  className="flex items-center py-3 px-3.5 w-full hover:bg-[var(--color-hover)]"
                  state={{ id: password.id }}
                >
                  <img
                    className="me-5 shrink-0"
                    src="src\assets\images\twitter.png"
                    alt="twitter"
                    width="16"
                    height="16"
                  />
                  <div className="flex grow">
                    <p className="grow text-start">
                      <span>{password.site}</span>
                    </p>
                    <ArrowLeft01Icon
                      className="cursor-pointer rounded-full hover:bg-[var(--color-hover)]"
                      size={"20px"}
                      strokeWidth="1"
                    />
                  </div>
                </Link>
              </li>
            ))
          }
          </ul>
        </section>)
        :
          (
            <div className="text-center mt-7">
              {t("noPassword")}
            </div>
          )
      ) : (
        <div className="flex justify-center mt-5">
          <Loading className="mr-3 text-white size-7" />
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
            error={errors.site}
            type="text"
            label={t("site")}
            placeholder="example.com"
            readOnly={false}
          />

          <Input
            {...register("username", { required: t("requiredUsername") })}
            error={errors.username}
            label={t("username")}
            type="text"
            readOnly={false}
          />

          <Input
            {...register("password", { required: t("requiredPassword") })}
            error={errors.password}
            label={t("password")}
            type="password"
            readOnly={false}
          />

          <div className="flex gap-x-2 mt-10">
            <button
              className="btn px-4 py-2 rounded flex items-center"
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
                <Loading className="mr-2 text-white size-4" />
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
      {alert.message && <Alert message={alert.message} />}
    </main>
  );
};

export default Main;
