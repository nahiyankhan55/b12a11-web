import "./App.css";
import { Outlet } from "react-router";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import Footer from "./Components/Footer";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto w-full h-full flex flex-col items-center">
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default App;
