import { renderComponent } from "../renderer/render.js";

const openWindowsProxy = [];

let openWindowsHandler = {
  set: function (target, prop, value) {
    $(document).trigger("arrayChanged", [prop, value]);
    "Array changed: ", prop, value;
    target[prop] = value;
    return true;
  },
};

const openWindows = new Proxy(openWindowsProxy, openWindowsHandler);

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
  if (openWindows.length >= 7) {
    alert("You can only open 7 windows at a time.");
    return;
  }

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

  "Open windows: ", openWindows;
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

  "Open windows: ", openWindows;
};

/**
 * Edit a window's settings
 * @param {HTMLElement} windowElement - The window to edit
 * @param {object} options - The options object
 * @returns {void}
 */
const editWindow = (windowElement, options) => {
  "Editing window: ", windowElement;
  const index = openWindows.findIndex(
    (windowObj) => windowObj.element === windowElement
  );

  if (index > -1) {
    const oldOptions = openWindows[index].options;
    openWindows[index].options = { ...oldOptions, ...options };
  }

  "New window settings: ", openWindows;
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

export { addWindow, removeWindow, editWindow, openWindows, openWindowsProxy };
