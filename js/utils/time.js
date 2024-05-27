const getClockTime = () => {
  const date = new Date();
  const time = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    ampm: "AM",
  };

  if (time.hours === 12) {
    time.ampm = "PM";
  } else if (time.hours > 12) {
    time.ampm = "PM";
    time.hours -= 12;
  }

  if (time.hours < 10) time.hours = "0" + time.hours;
  if (time.minutes < 10) time.minutes = "0" + time.minutes;
  if (time.seconds < 10) time.seconds = "0" + time.seconds;

  return time.hours + ":" + time.minutes + ":" + time.seconds + " " + time.ampm;
};

const formatTime = (date) => {
  const time = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    ampm: "AM",
  };

  if (time.hours === 12) {
    time.ampm = "PM";
  } else if (time.hours > 12) {
    time.ampm = "PM";
    time.hours -= 12;
  }

  if (time.hours < 10) time.hours = "0" + time.hours;
  if (time.minutes < 10) time.minutes = "0" + time.minutes;
  if (time.seconds < 10) time.seconds = "0" + time.seconds;

  return time.hours + ":" + time.minutes + ":" + time.seconds + " " + time.ampm;
};

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export default {
  getClockTime,
  formatTime,
  formatDate,
};
