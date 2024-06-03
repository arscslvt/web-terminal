/*
 * @function logger
 * @description Logs a message to the console
 * @param {string} msg
 * @param {string} type
 * @returns {void}
 */

function logger(msg, type) {
  let sym;

  switch (type) {
    case "warn":
      sym = "⚠️";
      break;
    case "error":
      sym = "🚨";
      break;
    case "info":
      sym = "💡";
      break;
    default:
      sym = "⚡️";
      break;
  }

  try {
    throw new Error();
  } catch (e) {
    if (e.stack) {
      // Parse the stack trace to find the caller line number
      const stackLines = e.stack.split("\n");
      let callerLine = "";

      // Different browsers have different formats for the stack trace
      if (stackLines.length >= 3) {
        // In most browsers, the third line of the stack trace contains the caller info
        callerLine = stackLines[2];
      } else if (stackLines.length >= 2) {
        // In some browsers, the second line might contain the caller info
        callerLine = stackLines[1];
      }

      // Extract the relevant part of the stack trace line
      const callerInfo = callerLine.match(/\((.*?):(\d+):(\d+)\)/);
      if (callerInfo) {
        const [_, file, line, col] = callerInfo;
        `[${sym}] ${msg}\n → \t${file}:${line}:${col})`;
      } else {
        `[${sym}] ${msg}\n → \t(Caller info not found)`;
      }
    } else {
      `[${sym}] ${msg}`;
    }
  }
}

export default logger;
