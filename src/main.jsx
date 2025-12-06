import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WebRouter from "./Router/WebRouter.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebContextProvider from "./Context/WebContextProvider.jsx";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WebContextProvider>
        <WebRouter></WebRouter>
        <ToastContainer></ToastContainer>
      </WebContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
