import commands from "../utils/commands.js";

const cmd_help = (args) => {
  if (args.length <= 0) {
    const temp_commands = Object.keys(commands.commands).map((command) => {
      return `${command} - ${commands.commands[command].description} <span class="muted">(usage: ${commands.commands[command].usage})</span>`;
    });

    return `Available commands: <br/>${temp_commands
      .sort((a, b) => a.split()[0].localeCompare(b.split()[0]))
      .join("<br/>")}`;
  }

  let help_list = [];

  // print in asc mode
  args.map((cmd) => {
    console.log("HELP CMD: ", cmd);
    if (commands.commands[cmd]) {
      console.log("HELP CMD found: ", cmd);
      const print = `${cmd} - ${commands.commands[cmd].description} <span class="muted">(usage: ${commands.commands[cmd].usage})</span>`;

      if (help_list.includes(print)) return;
      return help_list.push(
        `${cmd} - ${commands.commands[cmd].description} <span class="muted">(usage: ${commands.commands[cmd].usage})</span>`
      );
    }

    return help_list.push(
      `[warn] '${cmd}' is not a proper command on web-term.`
    );
  });

  return help_list
    .sort((a, b) => a.split()[0].localeCompare(b.split()[0]))
    .join("<br/>");
};

const cmd_echo = (args) => {
  return args.join(" ");
};

const cmd_clear = (args, options) => {
  const commandsList = options?.commandsList;

  if (!commandsList) {
    console.error("No commands list found");

    return "Error 500: Cannot clear the terminal without commands list.";
  }

  commandsList.innerHTML = "";
  return "";
};

const cmd_sudo = (args) => {
  const command = args[0];
  const t_args = args.slice(1);

  console.log(args);

  if (t_args.length <= 0) return commands.commands["sudo"].usage;

  if (args[0] === "sudo") {
    return "Cannot run sudo with sudo.";
  }

  logger(`Invoking sudo command: ${command}`, "info");

  return commands.commands[command]
    ? commands.commands[command].fn(t_args)
    : "Sudo command cannot be performed.";
};

export { cmd_help, cmd_echo, cmd_clear, cmd_sudo };
