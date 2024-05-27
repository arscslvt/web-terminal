import commands from "./commands.js";

const update_fs = (fs) => {
  window.fileSystem = fs || JSON.parse(localStorage.getItem("fileSystem"));
  localStorage.setItem(
    "fileSystem",
    JSON.stringify(window.fileSystem || { root: {} })
  );
};

const cmd_cd = (args) => {
  const path = args[0];

  if (!path) return "[err] provide a path to change the directory.";

  if (path === "..") {
    const currentDir = window.currentDir || ".";
    const parentDir = currentDir.split("/").slice(0, -1).join("/");

    window.currentDir = parentDir;

    return "";
  }

  const fileSystem = window.fileSystem;
  const currentDir = window.currentDir || ".";

  const newPath = path[0] === "/" ? path : `${currentDir}/${path}`;

  if (!fileSystem[newPath]) {
    return `[err] no such directory: ${newPath}`;
  }

  window.currentDir = newPath;

  return "";
};

const cmd_ls = (args) => {
  const fileSystem = window.fileSystem;
  const currentDir = window.currentDir || "root";

  const currentDirFiles = Object.keys(fileSystem[currentDir]);

  if (currentDirFiles.length <= 0) {
    return "0 files in this directory.";
  }

  return currentDirFiles.join("<br/>");
};

const cmd_mkdir = (args) => {
  const path = args[0];

  if (!path) return "[err] provide a path to create a directory.";

  const fileSystem = window.fileSystem;
  const currentDir = window.currentDir || ".";

  const newPath = path[0] === "/" ? path : `${currentDir}/${path}`;

  if (fileSystem[newPath]) {
    return `[err] directory already exists: ${newPath}`;
  }

  fileSystem[newPath] = {};

  update_fs(fileSystem);

  return "";
};

export { cmd_cd, cmd_ls, cmd_mkdir };
