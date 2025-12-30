const PRODUCTS_PER_PAGE = 9;
let currentPage = 1;

const promotions = [
  { img: "images/ad1.jpg", text: "限時優惠！全館 9 折", url: "https://example.com/sale" },
  { img: "images/ad2.jpg", text: "新品上市！冒險者周邊", url: "https://example.com/new" },
  { img: "images/ad3.jpg", text: "會員專屬禮包", url: "https://example.com/member" }
];

function renderPromotions() {
  const track = document.querySelector(".promotion-track");
  if (!track) return;

  track.innerHTML = "";
  promotions.forEach(ad => {
    const card = document.createElement("a");
    card.href = ad.url;
    card.className = "promotion-card";
    card.target = "_blank"; // 点击打开新页面
    card.innerHTML = `
      <img src="${ad.img}" alt="${ad.text}">
      <h3>${ad.text}</h3>
    `;
    track.appendChild(card);
  });
}

// 自动轮播
function startPromotionCarousel() {
  const track = document.querySelector(".promotion-track");
  if (!track) return;

  let index = 0;
  const total = track.children.length;

  setInterval(() => {
    index = (index + 1) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 3000); // 每 3 秒切换一条广告
}

document.addEventListener("DOMContentLoaded", () => {
  renderPromotions();
  startPromotionCarousel();
});


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
    { id: 9, name: "马克杯", price: 299, category: "stationery" },
    { id: 10, name: "椅子", price: 299, category: "stationery" },
  ];

  let cartCount = Number(localStorage.getItem("cartCount")) || 0;
  if (cartCountEl) cartCountEl.textContent = cartCount;

function updateProducts() {
  const keyword = searchInput?.value.toLowerCase() || "";
  const category = categorySelect?.value || "all";
  const priceValue =
    document.querySelector("input[name='price']:checked")?.value || "all";
  const sortValue = sortSelect?.value || "default";

  /* ===== 过滤 ===== */
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

  /* ===== 排序 ===== */
  if (sortValue === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortValue === "high") filtered.sort((a, b) => b.price - a.price);

  /* ===== 分页计算 ===== */
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const pageProducts = filtered.slice(start, end);

  /* ===== 渲染商品 ===== */
  productListContainer.innerHTML = "";

  pageProducts.forEach(p => {
    const a = document.createElement("a");
    a.href = `product.html?id=${p.id}`;
    a.target = "_blank";
    a.className = "product-link";
    a.innerHTML = `
      <div class="product-card">
        <img src="images/item${p.id}.jpg" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
      </div>
    `;
    productListContainer.appendChild(a);
  });

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active" : "";

    btn.addEventListener("click", () => {
      currentPage = i;
      updateProducts();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    pagination.appendChild(btn);
  }
}

searchInput?.addEventListener("input", () => {
  currentPage = 1;
  updateProducts();
});

categorySelect?.addEventListener("change", () => {
  currentPage = 1;
  updateProducts();
});

priceRadios.forEach(radio =>
  radio.addEventListener("change", () => {
    currentPage = 1;
    updateProducts();
  })
);

sortSelect?.addEventListener("change", () => {
  currentPage = 1;
  updateProducts();
});

  searchInput?.addEventListener("input", updateProducts);
  categorySelect?.addEventListener("change", updateProducts);
  priceRadios.forEach(r => r.addEventListener("change", updateProducts));
  sortSelect?.addEventListener("change", updateProducts);

  updateProducts();
});
