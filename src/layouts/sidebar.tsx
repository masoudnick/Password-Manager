
import logo from "../assets/images/logo.svg";
import { useTranslation } from "react-i18next";


const Sidebar = () =>{
    const { t } = useTranslation();
    return (
        <aside className="flex items-start gap-x-5 pe-5 mt-5">
            <img src={logo} alt="Logo" width="24px" />
            <h1 className="text-2xl">{t("siteTitle")}</h1>
        </aside>
    )
}


export default Sidebar;