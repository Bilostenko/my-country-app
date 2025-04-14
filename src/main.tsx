import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import App from "./App.tsx";
import "./index.css";

const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

if (storedTheme) {
  document.documentElement.classList.toggle("dark", storedTheme === "dark");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
