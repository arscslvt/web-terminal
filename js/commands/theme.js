import { switchTheme } from "../utils/theme-switcher.js";

const cmd_changeTheme = (args) => {
  return switchTheme(args[0]);
};

export { cmd_changeTheme };
