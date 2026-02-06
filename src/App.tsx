import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./layouts";
import { Main, PasswordItem } from "./pages";
import { useEffect } from "react";
import i18n from "./i18n";
import "./styles/tailwind.css";
import "./styles/index.scss";

function App() {
  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, []);

  return (
    <>
      <Header />
      <main className="mx-4 sm:w-1/2 sm:mx-auto lg:w-1/3 mt-3">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/*" element={<PasswordItem />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
