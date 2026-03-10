import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "./store";
import { checkAuthAction, fetchOffersAction } from "./store/api-action";

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());


const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
