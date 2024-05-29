const closeButton = document.querySelector("#close-terminal");
const minimizeButton = document.querySelector("#minimize-terminal");
const maximizeButton = document.querySelector("#maximize-terminal");

console.log("Terminal is mounted.");

const closeTerminal = () => {
  console.log("Closing terminal");
  window.unmountComponent("#terminal", "/terminal.html");
};

closeButton.addEventListener("click", closeTerminal);
