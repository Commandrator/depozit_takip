import { StrictMode, createElement } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { routerProvider } from "./router";
import palette from "./components/color"
import packages from "./components/lang";
const root = document.createElement("div");
root.id = "root";
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
document.body.style.backgroundColor = mediaQuery.matches ? "#023535" : "white";
document.body.style.color = mediaQuery.matches ? "white" : "black";
document.body.classList.add("custom-scrollbar");
const browserLanguage = navigator.language;
const portal = document.createElement("div");
portal.id = "portal";
const rootElement = createRoot(root);
rootElement.render(createElement(StrictMode, { children: routerProvider }));
document.body.appendChild(portal);
document.body.appendChild(root);
const langPack = packages[browserLanguage] ? packages[browserLanguage] : packages["tr"]; // varsayılan uygulama dili türkçe
const theme = palette[mediaQuery ? "dark" : "light"];
export { theme, langPack };

export default mediaQuery;
