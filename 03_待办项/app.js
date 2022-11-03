// ****** select items **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);

//clear items
clearBtn.addEventListener("click", clearItems);

//页面加载后获取本地存储
window.addEventListener("DOMContentLoaded", setupItems);

// ******** function ********

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && editFlag === false) {
    //创建article元素
    createListItem(id, value);
    displayAlert("添加代办项成功", "success");
    container.classList.add("show-container");

    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value !== "" && editFlag === true) {
    editElement.innerHTML = value;
    displayAlert("待办事项改变", "success");
    //修改本地存储的值
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("请输入待办项", "danger");
  }
}

//显示 提示框
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

//添加后去除默认值
function setBackToDefault() {
  editFlag = false;
  grocery.value = "";
  editID = "";
  submitBtn.textContent = "submit";
}

// 清除所有的待办项
function clearItems() {
  let items = document.querySelectorAll(".grocery-item");
  items.forEach((item) => {
    list.removeChild(item);
  });
  container.classList.remove("show-container");
  displayAlert("已清除所有待办项", "success");
  setBackToDefault();
  localStorage.removeItem("list");
}

function deleteItem(e) {
  //获取要删除的节点
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  //删除该元素
  list.removeChild(element);
  //去除样式
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("删除待办项成功", "success");
  setBackToDefault();
  removeFromLocalStorage(id);
}

function editItem(e) {
  //获取待办事项的元素
  const element = e.currentTarget.parentElement.parentElement;
  //获取待办事项的值
  editElement = e.currentTarget.parentElement.previousElementSibling;

  editFlag = true;
  grocery.value = editElement.innerHTML;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

//页面加载后获取本地存储的数据
function setupItems() {
  let items = getLocalStorage();
  console.log(items);
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

//实现存储
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

//根据id删除本地存储
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

//创建dom节点
function createListItem(id, value) {
  const element = document.createElement("article");
  //给元素添加样式
  element.classList.add("grocery-item");
  //给元素设置唯一的id
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  //给元素插入html
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

  //重点 因为document 中没有当前元素， 所以必须使用 父元素去选择元素
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);
  //插入元素
  list.appendChild(element);
}
