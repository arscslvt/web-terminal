import commands from "./js/utils/commands.js";

const commandsList = document.querySelector("#commands-list-[COMPONENT_ID]");
const commandInput = document.querySelector("#command-input-[COMPONENT_ID]");

const terminalHTML = document.querySelector("#terminal-[COMPONENT_ID]");

const sent_commands = [];
let current_command = 0;

commandInput.focus();

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

  if (e.key === "Tab") {
    e.preventDefault();
    const command = e.target.innerText.trim();
    const [providedCommandName, ...commandArgs] = command
      .trim()
      .split(/\s+/, 10);

    const commandName = providedCommandName.toLocaleLowerCase();

    if (command.includes(" ")) return;

    Object.keys(commands.commands).map((cmd) => {
      if (cmd.startsWith(commandName)) {
        commandInput.innerText = `${cmd} `;

        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(
          commandInput.childNodes[0],
          commandInput.innerText.length
        );

        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);

        return;
      }
    });
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
  const config = {
    user: window?.terminal?.user || "user",
  };

  const commandRow = document.createElement("div");
  commandRow.classList.add(
    "command",
    "command-item",
    type === "user" ? "user-command" : "system-command"
  );

  const prompt_container = document.createElement("div");
  prompt_container.classList.add("command-prompt");

  const prompt = document.createElement("span");
  prompt.classList.add("command-prompt-text");

  const commandText = document.createElement("span");
  commandText.classList.add("command-text");
  commandText.innerText = command;

  switch (type) {
    case "user":
      commandRow.classList.add("user-command");
      prompt.innerText = `${config.user}@localhost:~$`;
      break;
    case "system":
      commandRow.classList.add("system-command");
      commandText.innerHTML = `<div>${command}</div>`;
      prompt.innerText = "web-bash: ";
      break;

    default:
      commandRow.classList.add("user-command");
      commandText.innerText = command;
      break;
  }

  prompt_container.appendChild(prompt);
  commandRow.appendChild(prompt_container);
  commandRow.appendChild(commandText);

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

    const response = await window.invokeCommand(command, {
      terminal: terminalHTML,
      commandsList: commandsList,
    });

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
