/**
 *  Switches the theme of the website
 * @param string theme
 */

const availableThemes = ["orange", "green", "blue", "purple"];

const switchTheme = (theme) => {
  const body = document.querySelector("body");

  if (!availableThemes.includes(theme)) {
    console.error("Invalid theme");
    return `Invalid theme. Available themes: ${availableThemes.join(", ")}`;
  }

  body.setAttribute("data-theme", theme);

  localStorage.setItem("theme", theme);

  return `Theme changed to ${theme}`;
};

export { switchTheme };
