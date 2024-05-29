const commandsList = document.querySelector("#commands-list");
const commandInput = document.querySelector("#command-input");

const terminalHTML = document.querySelector("#terminal");

const sent_commands = [];
let current_command = 0;

commandInput.focus();

document.addEventListener("DOMContentLoaded", () => {
  console.log("Terminal is ready");
  commandInput.focus();
});

commandInput.addEventListener("blur", () => {
  commandInput.classList.remove("blink-caret");
});

commandInput.addEventListener("focus", () => {
  commandInput.classList.add("blink-caret");
});

commandInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();

    if (sent_commands.length <= 0) return;

    current_command = current_command - 1 < 0 ? 0 : current_command - 1;

    commandInput.innerText = sent_commands[current_command];

    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(commandInput.childNodes[0], commandInput.innerText.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    return;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();

    if (sent_commands.length <= 0) return;

    current_command =
      current_command + 1 > sent_commands.length - 1
        ? sent_commands.length - 1
        : current_command + 1;

    commandInput.innerText = sent_commands[current_command];

    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(commandInput.childNodes[0], commandInput.innerText.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    return;
  }
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

  commandsList.appendChild(commandRow);

  commandInput.innerHTML = "";
  commandInput.focus();

  if (type === "user") {
    sent_commands.push(command);
    current_command = sent_commands.length;
  }
};

commandInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const command = e.target.innerText.trim();
    handleAddCommand(command);

    const response = await window.invokeCommand(command);

    if (response) {
      handleAddCommand(response, "system");
    }
  }

  terminalHTML.scrollTop = terminalHTML.scrollHeight;
});

const handlePasteEvent = (e) => {
  e.preventDefault();

  // Get the text data from the clipboard or drag event
  const text = (e.clipboardData || e.dataTransfer).getData("text");

  // Insert the plain text into the contenteditable div
  document.execCommand("insertText", false, text);
};

commandInput.addEventListener("paste", handlePasteEvent);
commandInput.addEventListener("drop", handlePasteEvent);
