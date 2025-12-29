/* ================= 模拟商品资料 ================= */
const products = [
  { id: 1, name: "冒險者帆布袋", price: 299, category: "bag" },
  { id: 2, name: "盲盒", price: 99, category: "accessory" },
  { id: 3, name: "吧唧", price: 199, category: "accessory" },
  { id: 4, name: "玩偶", price: 599, category: "accessory" },
  { id: 5, name: "立牌", price: 299, category: "accessory" },
  { id: 6, name: "海报", price: 299, category: "stationery" },
  { id: 7, name: "桌垫", price: 299, category: "stationery" },
  { id: 8, name: "鼠标垫", price: 299, category: "stationery" },
  { id: 9, name: "马克杯", price: 299, category: "stationery" }
];

/* ================= DOM 元素 ================= */
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const themeToggle = document.getElementById("themeToggle");
const cartCountEl = document.getElementById("cart-count");
const productLinks = document.querySelectorAll(".product-link");

/* ================= 搜索功能 ================= */
if (searchInput) {
  searchInput.addEventListener("input", () => {
    filterProducts();
  });
}

/* ================= 分类筛选 ================= */
if (categorySelect) {
  categorySelect.addEventListener("change", () => {
    filterProducts();
  });
}

/* ================= 商品过滤逻辑 ================= */
function filterProducts() {
  const keyword = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  productLinks.forEach(link => {
    const title = link.querySelector("h3").innerText.toLowerCase();
    const productId = Number(
      link.getAttribute("href").split("id=")[1]
    );
    const product = products.find(p => p.id === productId);

    const matchName = title.includes(keyword);
    const matchCategory =
      category === "all" || product.category === category;

    if (matchName && matchCategory) {
      link.style.display = "block";
    } else {
      link.style.display = "none";
    }
  });
}

/* ================= 明暗模式 ================= */
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeToggle.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

/* ================= 购物车数量（示意） ================= */
let cartCount = 0;

document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("dblclick", () => {
    cartCount++;
    cartCountEl.textContent = cartCount;
  });
});


