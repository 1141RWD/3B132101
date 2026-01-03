const PRODUCTS_PER_PAGE = 9;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {

  /* ========= DOM ========= */
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  const themeToggle = document.getElementById("themeToggle");
  const cartCountEl = document.getElementById("cart-count");
  const priceRadios = document.querySelectorAll("input[name='price']");
  const sortSelect = document.getElementById("sortSelect");
  const productListContainer = document.querySelector(".product-list");
  const cartBtn = document.getElementById("cartBtn");

  // 点击购物车按钮跳转到购物车页面
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }

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
    { id: 1, name: "玩偶", price: 599, category: "honkai" },
    { id: 2, name: "鼠標墊", price: 499, category: "genshin" },
    { id: 3, name: "徽章", price: 399, category: "genshin" },
    { id: 4, name: "鑰匙圈", price: 100, category: "genshin" },
    { id: 5, name: "立牌", price: 399, category: "honkai" },
    { id: 6, name: "海报", price: 499, category: "honkai" },
    { id: 7, name: "吊飾", price: 299, category: "honkai" },
    { id: 8, name: "手辦", price: 3999, category: "ZZZ" },
    { id: 9, name: "收藏專輯", price: 1299, category: "ZZZ" },
    { id: 10, name: "盲盒", price: 299, category: "ZZZ" }
  ];

function updateProducts() {
  const keyword = searchInput?.value.toLowerCase() || "";
  const category = categorySelect?.value || "all";
  const priceValue =
    document.querySelector("input[name='price']:checked")?.value || "all";
  const sortValue = sortSelect?.value || "default";

  /* ===== 过滤 ===== */
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

  /* ===== 排序 ===== */
  if (sortValue === "low") list.sort((a, b) => a.price - b.price);
  if (sortValue === "high") list.sort((a, b) => b.price - a.price);

  /* ===== 分页计算 ===== */
  const totalPages = Math.ceil(list.length / PRODUCTS_PER_PAGE);
  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const pageItems = list.slice(start, start + PRODUCTS_PER_PAGE);

  /* ===== 渲染商品 ===== */
  productListContainer.innerHTML = "";

  pageItems.forEach(p => {
    const a = document.createElement("a");
    a.href = `product.html?id=${p.id}`;
    a.target = "_blank";
    a.className = "product-link";
    a.innerHTML = `
      <div class="product-card">
        <img src="images/item${p.id}.jpg">
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
  /* ========= 事件监听 ========= */
searchInput?.addEventListener("input", () => {
  currentPage = 1;
  updateProducts();
});

categorySelect?.addEventListener("change", () => {
  currentPage = 1;
  updateProducts();
});

priceRadios.forEach(r =>
  r.addEventListener("change", () => {
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

  const promotions = [
  { img: "images/ad1.jpg", link: "ad1.html" },
  { img: "images/ad2.jpg", link: "ad2.html" },
  { img: "images/ad3.jpg", link: "ad3.html" }
];
/* ========= 推薦廣告輪播 ========= */
function initPromotion() {
  const track = document.querySelector(".promotion-track");
  if (!track) return;

  promotions.forEach(ad => {
    const a = document.createElement("a");
    a.href = ad.link;
    a.target = "_blank";
    a.className = "promotion-card";
    a.innerHTML = `<img src="${ad.img}">`;
    track.appendChild(a);
  });

  let index = 0;
  setInterval(() => {
    index = (index + 1) % promotions.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 3000);
}

initPromotion();

});
// ================= 回到最上方按鈕 =================
const backToTopBtn = document.getElementById("backToTop");

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

// ================= 购物车数量（全站通用） =================
function updateCartCount() {
  const cartCountEl = document.getElementById("cart-count");
  if (!cartCountEl) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const totalCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  cartCountEl.textContent = totalCount;
}

// 页面载入时更新
document.addEventListener("DOMContentLoaded", updateCartCount);

// 监听其他页面更新购物车
window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    updateCartCount();
  }
});



