import time from "../utils/time.js";
import logger from "../utils/logger.js";

import "./command-handler.js";

window.logger = logger;

const lastSession = localStorage.getItem("lastSession");

const updateTime = () => {
  const timeHTML = document.querySelectorAll(".display-time");
  const timeStr = time.getClockTime();

  const lastSessionHTML = document.querySelector("#last-session");
  const lastSessionTime = new Date(parseInt(lastSession));
  const lastSessionStr = time.formatDate(lastSessionTime);

  lastSessionHTML.textContent = lastSessionStr;

  timeHTML.forEach((el) => {
    el.textContent = timeStr;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  logger("Page loaded succesfully.", "info");

  localStorage.setItem("lastSession", new Date().getTime());

  const refreshTime = setInterval(() => {
    updateTime();
  }, 500);
});

const commandsList = document.querySelector("#commands-list");
