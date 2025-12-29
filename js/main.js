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
const priceRadios = document.querySelectorAll("input[name='price']");
const sortSelect = document.getElementById("sortSelect");
const productListContainer = document.querySelector(".product-list");

/* ================= 购物车 ================= */
let cartCount = 0;

/* ================= 明暗模式 ================= */
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

/* ================= 更新商品列表函数 ================= */
function updateProducts() {
  const keyword = searchInput?.value.toLowerCase() || "";
  const category = categorySelect?.value || "all";
  const priceValue = document.querySelector("input[name='price']:checked")?.value || "all";
  const sortValue = sortSelect?.value || "default";

  // 1️⃣ 先过滤
  let filtered = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(keyword);
    const matchCategory = category === "all" || p.category === category;

    let matchPrice = true;
    if (priceValue !== "all") {
      const [min, max] = priceValue.split("-").map(Number);
      matchPrice = p.price >= min && p.price <= max;
    }

    return matchName && matchCategory && matchPrice;
  });

  // 2️⃣ 排序
  if (sortValue === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortValue === "high") filtered.sort((a, b) => b.price - a.price);

  // 3️⃣ 渲染 DOM
  productListContainer.innerHTML = "";
  filtered.forEach(p => {
    const a = document.createElement("a");
    a.href = `product.html?id=${p.id}`;
    a.className = "product-link";
    a.innerHTML = `
      <div class="product-card">
        <img src="images/item${p.id}.jpg" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
      </div>
    `;
    productListContainer.appendChild(a);

    // 绑定双击加入购物车
    const card = a.querySelector(".product-card");
    card.addEventListener("dblclick", () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
    });
  });
}

/* ================= 事件监听 ================= */
searchInput?.addEventListener("input", updateProducts);
categorySelect?.addEventListener("change", updateProducts);
priceRadios.forEach(radio => radio.addEventListener("change", updateProducts));
sortSelect?.addEventListener("change", updateProducts);

/* ================= 初始化 ================= */
updateProducts();
