const moveDiv = document.getElementById("move-div");

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  const h = window.scrollY;
  if (h > 200) {
    moveDiv.classList.add("w1");
  } else {
    moveDiv.classList.remove("w1");
  }
});
