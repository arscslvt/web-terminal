import time from "./js/utils/time.js";
import { unmountComponent } from "./js/renderer/render.js";

const lastSession = localStorage.getItem("lastSession");

const closeButton = document.querySelector("#close-terminal-[COMPONENT_ID]");
const minimizeButton = document.querySelector(
  "#minimize-terminal-[COMPONENT_ID]"
);
const maximizeButton = document.querySelector(
  "#maximize-terminal-[COMPONENT_ID]"
);

const windowControls = document.querySelector(
  "#window-controls-[COMPONENT_ID]"
);

// Handle dragging the window
let isDragging = false;
let initialX = 0;
let initialY = 0;

let boundindBox = {
  top: 0,
  left: 0,
  right: window.innerWidth,
  bottom: window.innerHeight,
};

const handleMouseMove = (e) => {
  if (!isDragging) return;

  const currentX = e.clientX - initialX;
  const currentY = e.clientY - initialY;

  const windowElement = document.querySelector("#terminal-[COMPONENT_ID]");

  if (
    currentX < boundindBox.left ||
    currentX + windowElement.offsetWidth > boundindBox.right
  )
    return;

  if (
    currentY < boundindBox.top ||
    currentY + windowElement.offsetHeight > boundindBox.bottom
  )
    return;

  windowElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
};

const handleMouseDown = (e) => {
  isDragging = true;

  initialX = e.clientX;
  initialY = e.clientY;
};

const handleMouseUp = () => {
  isDragging = false;
};

windowControls.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);

const closeTerminal = () => {
  console.log("Closing terminal");
  unmountComponent("[COMPONENT_ID]", "/terminal.html");
};

closeButton.addEventListener("click", closeTerminal);

const updateTime = () => {
  const timeHTML = document.querySelectorAll(".display-time");
  const timeStr = time.getClockTime();

  timeHTML.forEach((el) => {
    el.textContent = timeStr;
  });

  const lastSessionHTML = document.querySelector(
    "#last-session-[COMPONENT_ID]"
  );

  if (!lastSession) return (lastSessionHTML.textContent = "now");
  const lastSessionTime = new Date(parseInt(lastSession));
  const lastSessionStr = time.formatDate(lastSessionTime);

  lastSessionHTML.textContent = lastSessionStr;
};

localStorage.setItem("lastSession", new Date().getTime());

const refreshTime = setInterval(() => {
  const isTerminalRendered = document.querySelector("#terminal-[COMPONENT_ID]");

  if (!isTerminalRendered) {
    clearInterval(refreshTime);
    return;
  }
  updateTime();
}, 500);
