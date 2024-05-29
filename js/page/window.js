import { renderComponent } from "../renderer/render.js";

const containerElement = document.querySelector("#container");

let closeButtonElement;
let minimizeButtonElement;
let maximizeButtonElement;

const renderTerminal = async () => {
  const terminalElement = await renderComponent(
    "/terminal.html",
    containerElement
  );

  closeButtonElement = document.querySelector("#close-terminal");
  minimizeButtonElement = document.querySelector("#minimize-terminal");
  maximizeButtonElement = document.querySelector("#maximize-terminal");
};

document.addEventListener("DOMContentLoaded", () => {
  renderTerminal();
});
