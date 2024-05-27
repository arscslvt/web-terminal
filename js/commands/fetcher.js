import commands from "../utils/commands.js";

const curl = async (args) => {
  let url = args[0];

  if (!url) return `[err] provide an url to execute a GET request with curl.`;

  // remove url final or start quotes or double quotes
  url = url.replace(/^['"]|['"]$/g, "");

  const validateUrl = new RegExp("^(http|https)://[^\\s$.?#].[^\\s]*$", "gi");

  if (!validateUrl.test(url)) {
    return `[err] invalid url: ${url}`;
  }

  try {
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => data);

    return `<span class="word-break">${JSON.stringify(
      response,
      null,
      2
    )}</span>`;
  } catch (e) {
    console.error("Error fetching resource: ", e);
    return `Couldn't fetch this resource: ${e}`;
  }
};

export { curl };
