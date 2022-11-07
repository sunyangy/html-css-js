//过滤的商品数据
let filterProducts = [...products];
console.log(filterProducts);

const productsContainer = document.querySelector(".products-container");

//展示数据
const displayProducts = () => {
  if (filterProducts.length < 1) {
    productsContainer.innerHTML = `<h2>没有对应的数据</h2>`;
    return;
  }
  productsContainer.innerHTML = filterProducts
    .map((product) => {
      const { id, title, image, price } = product;
      return `<article class="product" data-id="${id}">
          <img
            src="${image}"
            class="product-img img"
            alt=""
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">${price}</span>
          </footer>
        </article>`;
    })
    .join("");
};

displayProducts();

//通过输入框过滤数据
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value;
  filterProducts = products.filter((p) => {
    return p.title.toLowerCase().includes(inputValue);
  });
  displayProducts();
});

//点击按钮过滤
const companies = document.querySelector(".companies");

const displayButtons = () => {
  const buttons = ["all", ...new Set(products.map((p) => p.company))];
  companies.innerHTML = buttons
    .map((b) => {
      return `<button class='company-btn' data-id="${b}">${b}</button>`;
    })
    .join("");
};
displayButtons();

companies.addEventListener("click", (e) => {
  if (e.target.classList.contains("company-btn")) {
    if (e.target.dataset.id === "all") {
      filterProducts = [...products];
    } else {
      filterProducts = products.filter((p) => {
        return p.company === e.target.dataset.id;
      });
    }
    displayProducts();
  }
});
