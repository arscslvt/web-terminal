import {
  cmd_clear,
  cmd_echo,
  cmd_help,
  cmd_sudo,
} from "../commands/generic.js";

import { curl } from "../commands/fetcher.js";
import logger from "./logger.js";

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

  curl: {
    description: "Transfer data from or to a server",
    usage: "curl [url]",
    isAsync: true,
    fn: curl,
  },
};

/**
 * @function invokeCommand
 * @description Invokes a command with the given arguments
 *
 * @param {string} command The command to invoke
 * @param {any} args The arguments to pass to the command
 *
 * @returns {string} The response from the command
 */
const invokeCommand = async (command, args) => {
  const [providedCommandName, ...commandArgs] = command.trim().split(/\s+/, 10);

  const commandName = providedCommandName.toLocaleLowerCase();

  if (commandName.includes(" ")) {
    return "Command name cannot contain spaces.";
  }

  console.log(`Command: ${commandName}\nArgs: ${commandArgs}`);

  if (!commands[commandName]) {
    logger(`Command not found: ${command}`);
    return `'${commandName}' is not a valid command. Type 'help' to see all available commands.`;
  }

  logger(`Invoking command: ${commandName}\nArgs: ${commandArgs}`, "info");

  let response;

  if (commands[commandName].isAsync) {
    console.log("Fn is async");
    response = await commands[commandName].fn(commandArgs);
  } else response = commands[commandName].fn(commandArgs);

  return response;
};

export default {
  commands,
  invokeCommand,
};
