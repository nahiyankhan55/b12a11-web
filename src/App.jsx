import "./App.css";
import { Outlet } from "react-router";
import "aos/dist/aos.css";
import Aos from "aos";
import { useContext, useEffect } from "react";
import WebContext from "./Context/WebContext";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);

  const { theme } = useContext(WebContext);

  return (
    <div
      className={`${
        theme === "dark" && "bg-slate-950 text-gray-300"
      } max-w-[1440px] mx-auto w-full h-full flex flex-col items-center overflow-hidden`}
    >
      <Outlet></Outlet>
    </div>
  );
}

export default App;
