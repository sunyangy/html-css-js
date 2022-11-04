//获取元素节点
function getElement(section) {
  const element = document.querySelector(section);
  console.log(element);
  if (element) {
    return element;
  }
  throw new Error("获取的元素不存在");
}

class Counter {
  constructor(element, value) {
    this.value = value;

    //获取按钮节点
    this.decreaseBtn = element.querySelector(".decrease");
    this.resetBtn = element.querySelector(".reset");
    this.increaseBtn = element.querySelector(".increase");
    this.valueDom = element.querySelector(".value");
    this.valueDom.textContent = this.value;

    //重点，改变点击后，方法中this的指向
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.reset = this.reset.bind(this);

    //监听点击事件
    this.increaseBtn.addEventListener("click", this.increase);
    this.resetBtn.addEventListener("click", this.reset);
    this.decreaseBtn.addEventListener("click", this.decrease);
  }
  increase() {
    this.value++;
    this.valueDom.textContent = this.value;
  }
  reset() {
    this.value = 0;
    this.valueDom.textContent = this.value;
  }
  decrease() {
    this.value--;
    this.valueDom.textContent = this.value;
  }
}

const firstCounter = new Counter(getElement(".first-counter"), 300);
const secondCounter = new Counter(getElement(".second-counter"), 200);
