import { renderComponent } from "../renderer/render.js";

const openWindows = [];
window.openWindows = openWindows;

let activeWindow = null;

/**
 * Add a window to the list of active windows
 * @param {HTMLElement} windowElement - The window to add
 * @returns {void}
 */
const addWindow = (windowElement) => {
  const windowObj = {
    id: windowElement.getAttribute("componentId"),
    element: windowElement,
  };

  openWindows.push(windowObj);
  activeWindow = openWindows[openWindows.length - 1];

  console.log("Open windows: ", openWindows);
};

/**
 * Remove a window from the list of active windows
 * @param {HTMLElement} windowElement - The window to remove
 * @returns {void}
 */
const removeWindow = (windowElement) => {
  const index = openWindows.findIndex(
    (windowObj) => windowObj.element === windowElement
  );

  if (index > -1) {
    openWindows.splice(index, 1);
    activeWindow = openWindows[openWindows.length - 1];
  }

  console.log("Open windows: ", openWindows);
};

const renderInitialComponents = async () => {
  const containerElement = document.querySelector("#container");
  await renderComponent("/terminal.html", containerElement);
  await renderComponent("/terminal.html", containerElement);
};

document.addEventListener("DOMContentLoaded", () => {
  renderInitialComponents();
});

export { addWindow, removeWindow };
