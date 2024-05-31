import { openWindows } from "./js/page/window.js";
import { renderComponent } from "./js/renderer/render.js";

const toolbarButtonContainer = document.querySelector(
  "#task-manager-toolbar-[COMPONENT_ID]"
);

// listener on openWindows
openWindows.forEach((app) => {
  const button = document.createElement("button");
  button.classList.add("task-manager-app");

  console.log("Button: ", app);

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

  button.addEventListener("click", () => {
    const appUrl = app?.options?.componentUrl;

    if (!appUrl) {
      console.error("Component URL is required");
      return;
    }

    console.log("Opening app: ", appUrl);

    renderComponent(appUrl, document.querySelector("#container"));
  });

  toolbarButtonContainer.appendChild(button);
});
