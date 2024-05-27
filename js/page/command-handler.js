import commands from "../utils/commands.js";

const commandsList = document.querySelector("#commands-list");
const commandInput = document.querySelector("#command-input");

document.addEventListener("DOMContentLoaded", () => {
  commandInput.focus();
});

commandInput.addEventListener("blur", () => {
  commandInput.classList.remove("blink-caret");
});

commandInput.addEventListener("focus", () => {
  commandInput.classList.add("blink-caret");
});

/**
 * @function handleAddCommand
 * @description Handles the addition of a new command
 *
 * @param {string} command The event object
 * @param {string} type The type of command to add (user or system)
 */
const handleAddCommand = (command, type = "user") => {
  const commandRow = document.createElement("div");
  commandRow.classList.add(
    "command-row",
    "command-item",
    type === "user" ? "user-command" : "system-command"
  );

  switch (type) {
    case "user":
      commandRow.classList.add("user-command");
      commandRow.innerText = command;
      break;
    case "system":
      commandRow.classList.add("system-command");
      commandRow.innerHTML = `<div>${command}</div>`;
      break;

    default:
      commandRow.classList.add("user-command");
      commandRow.innerText = command;
      break;
  }

  const commandsListLastChild = commandsList.lastChild;

  commandsList.insertBefore(commandRow, commandsListLastChild);

  commandInput.innerHTML = "";
  commandInput.focus();
};

commandInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const command = e.target.innerText.trim();
    handleAddCommand(command);

    const response = await commands.invokeCommand(command, null);

    if (response) {
      handleAddCommand(response, "system");
    }
  }
});
