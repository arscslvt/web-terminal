import {
  cmd_clear,
  cmd_echo,
  cmd_help,
  cmd_sudo,
} from "../commands/generic.js";

import { curl } from "../commands/fetcher.js";
import logger from "./logger.js";
import { cmd_cd, cmd_ls, cmd_mkdir } from "./file-system.js";
import { cmd_changeTheme } from "../commands/theme.js";

/**
 * @constant commands
 * @description A list of available commands
 */
const commands = {
  help: {
    description: "List all available commands",
    usage: "help | help [command]",
    fn: cmd_help,
  },
  clear: {
    description: "Clear the terminal",
    usage: "clear",
    fn: cmd_clear,
  },
  echo: {
    description: "Echo back the input",
    usage: "echo [input]",
    fn: cmd_echo,
  },
  sudo: {
    description: "Run a command as the superuser",
    usage: "sudo [command]",
    fn: cmd_sudo,
  },

  cd: {
    description: "Change the current directory",
    usage: "cd [path]",
    fn: cmd_cd,
  },
  ls: {
    description: "List all files in the current directory",
    usage: "ls",
    fn: cmd_ls,
  },
  mkdir: {
    description: "Create a new directory",
    usage: "mkdir [path]",
    fn: cmd_mkdir,
  },

  curl: {
    description: "Transfer data from or to a server",
    usage: "curl [url]",
    isAsync: true,
    fn: curl,
  },
  change_theme: {
    description: "Change the theme of the terminal",
    usage: "change_theme [theme]",
    fn: cmd_changeTheme,
  },
};

/**
 * @function invokeCommand
 * @description Invokes a command with the given arguments
 *
 * @param {string} command The command to invoke
 * @param {any} options Any options to pass to the command
 *
 * @returns {string} The response from the command
 */
const invokeCommand = async (command, options) => {
  const [providedCommandName, ...commandArgs] = command.trim().split(/\s+/, 10);

  const commandName = providedCommandName.toLocaleLowerCase();

  if (commandName.includes(" ")) {
    return "Command name cannot contain spaces.";
  }

  if (!commands[commandName]) {
    logger(`Command not found: ${command}`);
    return `'${commandName}' is not a valid command. Type 'help' to see all available commands.`;
  }

  logger(`Invoking command: ${commandName}\nArgs: ${commandArgs}`, "info");

  let response;

  if (commands[commandName].isAsync) {
    console.log("Fn is async");
    response = await commands[commandName].fn(commandArgs, options);
  } else response = commands[commandName].fn(commandArgs, options);

  return response;
};

window.invokeCommand = invokeCommand;

export default {
  commands,
  invokeCommand,
};
