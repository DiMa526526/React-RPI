import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { Settings } from "./const";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <App rentalOffersCount={Settings.rentOffersCount} />
  </StrictMode>
);
