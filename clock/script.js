const needle_hours = document.querySelector("#needle__hour");
const needle_minutes = document.querySelector("#needle__minute");
const needle_seconds = document.querySelector("#needle__second");

setInterval(getTime, 1000);

function getTime() {
  const date = new Date();

  const hours24 = date.getHours();

  const hours = hours24 % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const ampm = hours24 >= 12 ? "PM" : "AM";

  const time = `${setZero(hours)}:${setZero(minutes)} ${ampm}`;

  const hoursDeg = scale(hours24, 0, 12, 0, 360);
  const minutesDeg = scale(minutes, 0, 60, 0, 360);
  const secondsDeg = scale(seconds, 0, 60, 0, 360);

  const center = "translate(-50%, -100%) ";

  needle_hours.style.transform = `${center} rotate(${hoursDeg}deg)`;
  needle_minutes.style.transform = `${center} rotate(${minutesDeg}deg)`;
  needle_seconds.style.transform = `${center} rotate(${secondsDeg}deg)`;

  document.querySelector(".date").innerHTML = time;
}

function setZero(value) {
  return value < 10 ? `0${value}` : value;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
