import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="max-w-[1440px] mx-auto w-full h-full flex flex-col items-center">
      <Outlet></Outlet>
    </div>
  );
}

export default App;
