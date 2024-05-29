/**
 * @param {string} componentUrl
 * @returns {Promise<HTMLElement>}
 */

const requestComponent = async (componentUrl) => {
  const componentHTML = fetch(`components/${componentUrl}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const docScripts = Array.from(
        document.getElementsByTagName("script")
      ).map((script) => script.src);

      return response.text().then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const links = Array.from(doc.getElementsByTagName("link")).map(
          (link) => link.href
        );
        const scripts = Array.from(doc.getElementsByTagName("script"));

        const filteredScripts = scripts.filter(
          (script) => !docScripts.includes(script)
        );

        filteredScripts.forEach((script) => {
          const scriptElement = document.createElement("script");

          // Load original script attributes
          Array.from(script.attributes).forEach((attr) => {
            scriptElement.setAttribute(attr.name, attr.value);
          });

          scriptElement.id = `componentscript-${script.src}`;

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
const unmountComponent = async (componentSelector, componentUrl) => {
  if (!componentSelector) {
    console.error("Component selector is required");
    return;
  }

  if (!componentUrl) {
    console.error("Component URL is required");
    return;
  }

  const component = document.querySelector(componentSelector);

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
  }
};

window.unmountComponent = unmountComponent;

const renderComponent = async (componentUrl, targetElement) => {
  const component = await requestComponent(componentUrl);

  const componentFirstElement = new DOMParser().parseFromString(
    component,
    "text/html"
  ).body.firstChild;

  const element = document.createElement(componentFirstElement.tagName, {
    is: componentFirstElement.is,
  });
  element.classList.add(componentFirstElement.classList);
  element.id = componentFirstElement.id;

  element.innerHTML = componentFirstElement.innerHTML;

  console.log("Component to render: ", element);
  targetElement.appendChild(element);
};

export { requestComponent, renderComponent };
