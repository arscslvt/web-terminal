/**
 * @param {string} componentUrl
 * @returns {Promise<HTMLElement>}
 */

import { addWindow, removeWindow } from "../page/window.js";

const requestComponent = async (componentUrl, componentId) => {
  const componentHTML = fetch(`components/${componentUrl}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const docScripts = Array.from(
        document.getElementsByTagName("script")
      ).map((script) => script.src);

      return response.text().then((html) => {
        // regex for [componentId]
        html = html.replace(new RegExp(`\\[COMPONENT_ID\\]`, "g"), componentId);

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const links = Array.from(doc.getElementsByTagName("link")).map(
          (link) => link.href
        );
        const scripts = Array.from(doc.getElementsByTagName("script"));

        const filteredScripts = scripts.filter(
          (script) => !docScripts.includes(script)
        );

        filteredScripts.forEach(async (script) => {
          const scriptText = await requestScript(script.src, {
            replaceField: {
              name: "COMPONENT_ID",
              value: componentId,
            },
          });

          const scriptElement = document.createElement("script");

          scriptElement.text = scriptText;

          // Load original script attributes
          Array.from(script.attributes).forEach((attr) => {
            if (attr.name === "src") return;
            scriptElement.setAttribute(attr.name, attr.value);
          });

          scriptElement.type = "module";
          scriptElement.setAttribute("script-from", `component-${componentId}`);

          document.body.appendChild(scriptElement);
        });

        links.forEach((link) => {
          const linkElement = document.createElement("link");
          linkElement.href = link;
          linkElement.rel = "stylesheet";
          document.head.appendChild(linkElement);
        });

        return html;
      });
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });

  const ElementFromHTML = new DOMParser().parseFromString(
    await componentHTML,
    "text/html"
  );

  const withoutBody = ElementFromHTML.documentElement.innerHTML;

  return new DOMParser().parseFromString(withoutBody, "text/html").body
    .innerHTML;
};

/**
 * @param {string} scriptUrl
 *
 * @param {object} options
 *    @param {object} options.replaceField
 *        @param {string} options.replaceField.name
 *         @param {string} options.replaceField.value
 *
 * @returns {Promise<string>}
 * @throws {Error}
 */

const requestScript = async (scriptUrl, options) => {
  const script = fetch(scriptUrl)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.text().then((scriptText) => {
        if (options && options.replaceField) {
          scriptText = scriptText.replace(
            new RegExp(`\\[${options.replaceField.name}\\]`, "g"),
            options.replaceField.value
          );
        }
        return scriptText;
      });
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });

  return script;
};

/**
 * @param {string} componentUrl
 * @returns {Promise<string[]>}
 */
const getPageScripts = (componentUrl) => {
  const componentScripts = fetch(`components/${componentUrl}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.text().then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const scripts = Array.from(doc.getElementsByTagName("script"));

        return scripts;
      });
    })

    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });

  return componentScripts;
};

/**
 * @param {string} componentSelector
 * @param {string} componentUrl
 */
const unmountComponent = async (componentId, componentUrl) => {
  if (!componentId) {
    console.error("Component ID is required");
    return;
  }

  if (!componentUrl) {
    console.error("Component URL is required");
    return;
  }

  const component = document.querySelector(`[componentid="${componentId}"]`);

  console.log("Found component: ", component);

  if (component) {
    const scripts = await getPageScripts(componentUrl).catch((error) => {
      console.error(
        "There has been a problem fetching component scripts: ",
        error
      );
    });

    try {
      scripts.forEach((script) => {
        const scriptElement = document.getElementById(
          `componentscript-${script.src}`
        );

        if (scriptElement) {
          console.log("Deleting script: ", scriptElement.src);
          scriptElement.remove();
        }
      });
    } catch (error) {
      console.error("Error deleting script: ", error);
      throw Error("Error deleting script");
    }

    component.remove();

    removeWindow(component);
  }
};

window.unmountComponent = unmountComponent;

const renderComponent = async (componentUrl, targetElement) => {
  const randomId = Math.random().toString(36).substring(7);

  const component = await requestComponent(componentUrl, randomId);

  const componentFirstElement = new DOMParser().parseFromString(
    component,
    "text/html"
  ).body.firstChild;

  const element = document.createElement(componentFirstElement.tagName, {
    is: componentFirstElement.is,
  });
  element.classList.add(componentFirstElement.classList);
  element.id = componentFirstElement.id;

  // assign new attribute for componentId
  element.setAttribute("componentId", randomId);

  element.innerHTML = componentFirstElement.innerHTML;

  console.log("Component to render: ", element);
  targetElement.appendChild(element);

  addWindow(element);
};

export { requestComponent, renderComponent, unmountComponent };
