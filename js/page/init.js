import time from "../utils/time.js";
import logger from "../utils/logger.js";

import "./command-handler.js";

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
  logger("Page loaded succesfully.", "info");

  localStorage.setItem("lastSession", new Date().getTime());

  const refreshTime = setInterval(() => {
    updateTime();
  }, 500);
});

const commandsList = document.querySelector("#commands-list");
