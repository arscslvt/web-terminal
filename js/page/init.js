import time from "../utils/time.js";
import logger from "../utils/logger.js";

import "./command-handler.js";

window.logger = logger;

const updateTime = () => {
  const timeHTML = document.querySelectorAll(".display-time");
  const timeStr = time.getClockTime();

  timeHTML.forEach((el) => {
    el.textContent = timeStr;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  logger("Page loaded succesfully.", "info");

  const refreshTime = setInterval(() => {
    updateTime();
  }, 500);
});
