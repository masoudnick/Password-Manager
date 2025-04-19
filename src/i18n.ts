import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      headerSearchPlaceholder: "Search Password ...",
      add: "Add",
      editPassword: "Edit password",
      newPassword: "Add new password",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      password: "Password",
      site: "Site",
      username: "Username",
      note: "Note",
      requireSite: "Don’t forget the website URL!",
      invalidSite: "Invalid URL format",
      requiredUsername: "Pick a username for us!",
      requiredPassword: "Don’t forget to enter your password!",
      noPassword: "Your password list is currently empty!",
      error: "Something went wrong! Please try again."
    },
  },
  fa: {
    translation: {
    headerSearchPlaceholder: "جستجوی رمز عبور ...",
      add: "افزودن",
      editPassword: "ویرایش رمز عبور",
      newPassword: "رمز عبور جدید",
      password: "رمز عبور",
      edit: "ویرایش",
      delete: "حذف",
      save: "ذخیره",
      cancel: "لغو",
      site: "سایت",
      username: "نام کاربری",
      note: "یادداشت",
      requireSite: "آدرس سایت یادت نره!",
      invalidSite: "آدرس سایت معتبر نیست",
      requiredUsername: "یه نام کاربری برامون بنویس",
      requiredPassword: "یادت نره گذرواژه‌تو وارد کنی",
      noPassword: "لیست گذرواژه‌هات فعلاً خالیه!",
      error: "مشکلی پیش آمده است! لطفاً دوباره تلاش کنید."

    },
  },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "fa",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
