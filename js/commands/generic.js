import commands from "../utils/commands.js";

const commandsList = document.querySelector("#commands-list");

const cmd_help = (args) => {
  const temp_commands = Object.keys(commands.commands).map((command) => {
    return `${command} - ${commands.commands[command].description} <span class="muted">(usage: ${commands.commands[command].usage})</span>`;
  });

  return `Available commands: <br/>${temp_commands.join("<br/>")}`;
};

const cmd_echo = (args) => {
  return args.join(" ");
};

const cmd_clear = (args) => {
  commandsList.innerHTML = "";
  return "";
};

const cmd_sudo = (args) => {
  const command = args[0];
  const t_args = args.slice(1);

  console.log(args);

  if (args[0] === "sudo") {
    return "Cannot run sudo with sudo.";
  }

  logger(`Invoking sudo command: ${command}`, "info");

  return commands.commands[command]
    ? commands.commands[command].fn(t_args)
    : "Sudo command cannot be performed.";
};

export { cmd_help, cmd_echo, cmd_clear, cmd_sudo };
