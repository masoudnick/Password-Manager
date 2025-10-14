import { Header, Main, Paswword, Sidebar } from "./layouts";
import "./styles/tailwind.css";
import "./styles/index.scss";
import { useEffect } from "react";
import i18n from "./i18n";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, []);

  return (
    <section className="flex">
      <section className="mx-auto w-1/3 mt-2 p-4">
        <Header></Header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/*" element={<Paswword />} />
          </Routes>
        </BrowserRouter>
      </section>
      <Sidebar />
    </section>
  );
}

export default App;
