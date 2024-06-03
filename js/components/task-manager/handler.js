import { openWindows } from "./js/page/window.js";
import { renderComponent } from "./js/renderer/render.js";

const toolbarButtonContainer = document.querySelector(
  "#task-manager-toolbar-[COMPONENT_ID] .opened-apps"
);
const toolbarFixedContainer = document.querySelector(
  "#task-manager-toolbar-[COMPONENT_ID] .fixed-apps"
);

// const fixedApps = document.querySelectorAll(".fixed-apps fixed-app");

// ("Fixed apps: ", fixedApps);

// fixedApps.forEach((app, i) => {
//   ("Fixed app: ", app);
//   app.addEventListener("click", () => {
//     ("Opening app: ", app);

//     const appUrl = app?.dataset?.appUrl;

//     if (!appUrl) {
//       console.error("Component URL is required");
//       return;
//     }

//     renderComponent(appUrl, document.querySelector("#container"));
//   });
// });

const buildTaskManager = (app, where = toolbarButtonContainer) => {
  const button = document.createElement("button");
  button.classList.add("task-manager-app");

  "Button: ", app;

  const icon = document.createElement("img");

  const isValidSrc =
    app.options.appIconUrl &&
    String(app.options.appIconUrl).match(
      /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif|svg))/i
    );

  if (isValidSrc) {
    icon.src = "/assets/app/icons/" + app.options.appIconUrl;
    icon.alt = app.options.appName;
    icon.classList.add("task-manager-icon");
  }

  const text = document.createElement("span");
  text.textContent = app.options.appName;
  text.classList.add("task-manager-appName");

  button.appendChild(icon);
  button.appendChild(text);

  const isMinimized = app.options.minimized;

  if (isMinimized) {
    ("App minimized");
    app.element;
    app.element.classList.toggle("minimized");
  }

  button.addEventListener("click", () => {
    const appUrl = app?.options?.componentUrl;

    if (!appUrl) {
      console.error("Component URL is required");
      return;
    }

    "Opening app: ", appUrl;

    renderComponent(appUrl, document.querySelector("#container"), app.id);
  });

  where.appendChild(button);
};

$(document).on("arrayChanged", (e, prop, value) => {
  "Task Manager Array changed: ", prop, value;

  toolbarButtonContainer.innerHTML = "";

  // listener on openWindows
  openWindows.map((app, i) => {
    buildTaskManager(app);
  });
});

openWindows.map((app, i) => {
  buildTaskManager(app);
});
