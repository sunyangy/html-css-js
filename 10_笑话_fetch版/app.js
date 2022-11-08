const url = "https://icanhazdadjoke.com/";

const btn = document.querySelector(".btn");
const result = document.querySelector(".result");

btn.addEventListener("click", fetchResult);

async function fetchResult() {
  result.textContent = "loading......";
  try {
    const respones = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "learning app",
      },
    });
    if (!respones.ok) {
      throw new Error("请求出错");
    }

    const data = await respones.json();
    console.log(data);
    result.textContent = data.joke;
  } catch (error) {
    console.log(error.message);
  }
}

fetchResult();
