import time from "../utils/time.js";
import logger from "../utils/logger.js";

import "../page/window.js";
import "../utils/commands.js";

window.logger = logger;

const lastSession = localStorage.getItem("lastSession");
const fileSystem =
  localStorage.getItem("fileSystem") ||
  localStorage.setItem(
    "fileSystem",
    JSON.stringify({
      root: {},
    })
  );

window.fileSystem = JSON.parse(fileSystem);
window.currentDir = "root";

const updateTime = () => {
  const timeHTML = document.querySelectorAll(".display-time");
  const timeStr = time.getClockTime();

  timeHTML.forEach((el) => {
    el.textContent = timeStr;
  });

  const lastSessionHTML = document.querySelector("#last-session");

  if (!lastSession) return (lastSessionHTML.textContent = "now");
  const lastSessionTime = new Date(parseInt(lastSession));
  const lastSessionStr = time.formatDate(lastSessionTime);

  lastSessionHTML.textContent = lastSessionStr;
};

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("lastSession", new Date().getTime());

  const refreshTime = setInterval(() => {
    const isTerminalRendered = document.querySelector("#terminal");

    if (!isTerminalRendered) {
      clearInterval(refreshTime);
      return;
    }
    updateTime();
  }, 500);
});
