document.addEventListener("DOMContentLoaded", () => {

  /* ========= DOM ========= */
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  const themeToggle = document.getElementById("themeToggle");
  const cartCountEl = document.getElementById("cart-count");
  const priceRadios = document.querySelectorAll("input[name='price']");
  const sortSelect = document.getElementById("sortSelect");
  const productListContainer = document.querySelector(".product-list");

  /* ========= 主题（全页面通用） ========= */
if (document.documentElement.classList.contains("dark")) {
  document.body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
} else {
  if (themeToggle) themeToggle.textContent = "🌙";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    document.body.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}


  /* ========= 如果不是商品列表页，就到此为止 ========= */
  if (!productListContainer) return;

  /* ========= 商品资料 ========= */
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

  let cartCount = Number(localStorage.getItem("cartCount")) || 0;
  if (cartCountEl) cartCountEl.textContent = cartCount;

  function updateProducts() {
    const keyword = searchInput?.value.toLowerCase() || "";
    const category = categorySelect?.value || "all";
    const priceValue =
      document.querySelector("input[name='price']:checked")?.value || "all";
    const sortValue = sortSelect?.value || "default";

    let list = products.filter(p => {
      const matchName = p.name.toLowerCase().includes(keyword);
      const matchCategory = category === "all" || p.category === category;

      let matchPrice = true;
      if (priceValue !== "all") {
        const [min, max] = priceValue.split("-").map(Number);
        matchPrice = p.price >= min && p.price <= max;
      }

      return matchName && matchCategory && matchPrice;
    });

    if (sortValue === "low") list.sort((a, b) => a.price - b.price);
    if (sortValue === "high") list.sort((a, b) => b.price - a.price);

    productListContainer.innerHTML = "";

    list.forEach(p => {
      const a = document.createElement("a");
      a.href = `product.html?id=${p.id}`;
      a.className = "product-link";
      a.innerHTML = `
        <div class="product-card">
          <img src="images/item${p.id}.jpg">
          <h3>${p.name}</h3>
          <p class="price">$${p.price}</p>
        </div>
      `;

      a.querySelector(".product-card").addEventListener("dblclick", () => {
        cartCount++;
        cartCountEl.textContent = cartCount;
        localStorage.setItem("cartCount", cartCount);
      });

      productListContainer.appendChild(a);
    });
  }

  searchInput?.addEventListener("input", updateProducts);
  categorySelect?.addEventListener("change", updateProducts);
  priceRadios.forEach(r => r.addEventListener("change", updateProducts));
  sortSelect?.addEventListener("change", updateProducts);

  updateProducts();
});
