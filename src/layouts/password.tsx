import { ArrowLeft02Icon } from "hugeicons-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Loading, Modal } from "../components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getRootDomain } from "../utilities";
import { Alert } from "../components";

type Inputs = {
  username: string;
  password: string;
};

type Password = {
  id: number;
  username: string;
  password: string;
  site: string;
};

const Paswword = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alert, showAlert] = useState<{message: string}>({
    message: "",
  });
  
  const [loading, setLoading] = useState<{[key: string]: boolean}>({
      modal: false,
      password: false,
    });

  const [password, setPassword] = useState<Password>({
    id: 0,
    username: "",
    password: "",
    site: "",
  });

  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading((prev) => ({ ...prev, modal: true }));
    fetch("http://localhost/password-manager/api.php?id=" + location.state.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading((prev) => ({ ...prev, modal: false }));
        setIsOpen(false);
        if (res.status === 200) {
          showAlert({ message: t("passwordEdited") });
        }
        else{
          showAlert({ message: t("error") });
        }
        
      })
      .catch(() => {
        showAlert({ message: t("error") });
      });
  };

  const fetchPassword = async () => {
    const res = await fetch(
      "http://localhost/password-manager/api.php?id=" + location.state.id
    );
    const data = await res.json();
    setPassword(data.data[0]);
  };

  const deletePassword = async () => {
    fetch("http://localhost/password-manager/api.php?id=" + location.state.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          showAlert({ message: t("passwordDeleted") });
          fetchPassword();
        }
        else{
          showAlert({ message: t("error") });
        }

      })
      .catch(() => {
        showAlert({ message: t("error") });
      });
  };

  useEffect(() => {
    fetchPassword();
    setValue("username", password.username);
    setValue("password", password.password);
  }, [isOpen]);


  return (
    <main>
      <section className="flex mb-9 items-center flex-row-reverse justify-start">
        <ArrowLeft02Icon
          onClick={() => navigate(-1)}
          className="p-1 cursor-pointer rounded-full ms-1.5 hover:bg-[var(--color-hover)]"
          size={"30px"}
          strokeWidth="2"
        />
        <h2 className="text-lg">{getRootDomain(password.site)}</h2>
      </section>

      <div className="rounded-xl bg-[var(--card-bg-color)] shadow-[var(--card-shadow)]">
        <div className="">
          <div className="grid grid-cols-2 p-5 mt-4 gap-x-4 gap-y-5">
            <Input
              label={t("username")}
              type="text"
              readOnly={true}
              value={password.username}
            />
            <Input
              label={t("password")}
              type="password"
              readOnly={true}
              value={password.password}
            />
          </div>
          <div className="py-4 px-5 border-t border-[var(--color-hover)]">
            <button
              className="btn px-4 py-1.5 rounded me-3"
              onClick={() => setIsOpen(true)}
            >
              {t("edit")}
            </button>
            <button
              className="btn px-4 py-1.5 rounded"
              onClick={deletePassword}
            >
              {t("delete")}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header={t("editPassword")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex gap-x-2 mt-2">
            <button
              className="btn px-4 py-2 rounded flex items-center"
              type="submit"
              disabled={errors.username || errors.password || loading.modal ? true : false}
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
      <Alert message={alert.message} setMessage={showAlert} />
    </main>
  );
};

export default Paswword;
