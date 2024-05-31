import { renderComponent } from "../renderer/render.js";

const openWindows = [];
window.openWindows = openWindows;

let activeWindow = null;

/** @var string[] */
const systemWindows = ["task-manager.html"];

/**
 * Add a window to the list of active windows
 * @param {HTMLElement} windowElement - The window to add
 * @param {object} options - The options object
 * @param {string} options.componentUrl - The URL of the component
 * @param {string} options.appIconUrl - The URL of the app icon
 * @returns {void}
 */
const addWindow = (
  windowElement,
  { componentId, componentUrl, appIconUrl, appName }
) => {
  if (systemWindows.includes(componentUrl.match(/[^/]+$/)[0])) return;

  const windowObj = {
    id: componentId,
    element: windowElement,
    options: {
      componentUrl,
      appIconUrl,
      appName,
    },
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

  const taskManagerViewportElement = document.querySelector(
    ".task-manager-viewport"
  );

  await renderComponent("/terminal.html", containerElement);
  // await renderComponent("/terminal.html", containerElement);

  await renderComponent("/task-manager.html", taskManagerViewportElement);
};

document.addEventListener("DOMContentLoaded", () => {
  renderInitialComponents();
});

export { addWindow, removeWindow, openWindows };
