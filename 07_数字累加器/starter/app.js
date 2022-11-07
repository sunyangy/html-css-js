const items = [...document.querySelectorAll(".number")];
console.log(items);

function updateNumber(e) {
  const value = Number(e.dataset.value);
  const initialResult = Math.ceil(value / 1000);
  let initialValue = 0;
  const timer = setInterval(() => {
    initialValue += initialResult;
    if (initialValue > value) {
      e.textContent = `${value}+`;
      clearInterval(timer);
      return;
    }

    e.textContent = `${initialValue}+`;
  }, 1);
}

items.forEach((item) => {
  updateNumber(item);
});
