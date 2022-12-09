const username = document.getElementById("username");
const password = document.getElementById("password");

const btn = document.querySelector(".login-button");

btn.addEventListener("click", () => {
  console.log(username.value);
  console.log(password.value);
});
