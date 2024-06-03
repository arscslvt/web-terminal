import { editWindow } from "./js/page/window.js";

const closeTerminal = () => {
  ("Closing terminal");
  unmountComponent("[COMPONENT_ID]", "/terminal.html");
};

const windowControls = document.querySelector(
  "#window-controls-[COMPONENT_ID]"
);

const appElement = document.getElementById("app-[COMPONENT_ID]");

const closeBtn = document.getElementById("win-close-btn-[COMPONENT_ID]");
const minimizeBtn = document.getElementById("win-minimize-btn-[COMPONENT_ID]");
const maximizeBtn = document.getElementById("win-maximize-btn-[COMPONENT_ID]");

closeBtn.addEventListener("click", closeTerminal);

minimizeBtn.addEventListener("click", () => {
  editWindow(appElement, { minimized: true });
  appElement.classList.add("minimized");
});

const handleMaximized = () => {
  appElement.classList.toggle("maximized");
};

maximizeBtn.addEventListener("click", handleMaximized);

windowControls.addEventListener("dblclick", handleMaximized);
