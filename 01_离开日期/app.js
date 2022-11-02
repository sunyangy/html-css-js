const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// 实现时间从 11.25到现在时间的计数
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

// 获取当前的时间
const nowTime = new Date();

const nowYear = nowTime.getFullYear();
const nowMonth = nowTime.getMonth();
const nowDay = nowTime.getDay();

/**
 * 计算未来的时间，返回到html页面上
 */
// 定义截至的时间
const futureTime = new Date(nowYear, nowMonth, 25, 6, 30, 0);

const year = futureTime.getFullYear();
let month = futureTime.getMonth();
let weekday = futureTime.getDay();
const hours = futureTime.getHours();
const minutes = futureTime.getMinutes();
const date = futureTime.getDate();

weekday = weekdays[weekday];
month = months[month];

giveaway.textContent = `leave ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

/**
 * 实现倒计时操作,重点 时间戳的使用
 */

const futureTimeStamp = futureTime.getTime();
console.log(futureTimeStamp);

function getRemaindingTime() {
  const nowTimeStamp = new Date().getTime();
  console.log(nowTimeStamp);
  const t = futureTimeStamp - nowTimeStamp;

  //定义days，hours,minutes,seconds
  const days = 25 * 60 * 60 * 1000;
  const hours = 60 * 60 * 1000;
  const minutes = 60 * 1000;
  const seconds = 1000;

  // 计算离开时间
  const tdays = t / days;
  const leaveDays = Math.floor(tdays);
  const leaveHours = Math.floor((t % days) / hours);
  const leaveMinutes = Math.floor((t % hours) / minutes);
  const leaveSeconds = Math.floor((t % minutes) / seconds);

  const values = [leaveDays, leaveHours, leaveMinutes, leaveSeconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  // 遍历需要格式化的元素
  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">离开了</h4>`;
  }
}
let countdown = setInterval(getRemaindingTime, 1000);

getRemaindingTime();
