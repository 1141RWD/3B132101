// 点击购物车按钮跳转到购物车页面
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }
// ================= 載入商品資料 =================
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = products.find(item => item.id === id);
  if (!p) {
    alert("商品不存在！");
    return;
  }

  // 商品基本資訊
  document.getElementById("product-name").innerText = p.name;
  document.getElementById("product-price").innerText = `$${p.price}`;
  document.getElementById("product-desc").innerText = p.desc;
  document.getElementById("product-img").src = p.img;
  document.getElementById("product-img").alt = p.name;

const descPanel = document.getElementById("desc");
descPanel.innerHTML = "";

// 只放圖片
if (p.images && p.images.length) {
  p.images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = p.name;
    img.style.width = "100%";
    img.style.marginBottom = "16px";
    descPanel.appendChild(img);
  });
}


  // 商品規格 Tab
  const specPanel = document.getElementById("spec");
  specPanel.innerHTML = ""; // 清空之前内容
  const ul = document.createElement("ul");
  p.specs.forEach(spec => {
    const li = document.createElement("li");
    li.innerText = spec;
    ul.appendChild(li);
  });
  specPanel.appendChild(ul);

  // Tab 切換功能
  const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    tabPanels.forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});


  // ===== 加入购物车 =====
  const addBtn = document.getElementById("add-cart-btn");
  const qtyInput = document.getElementById("product-qty");
  addBtn.addEventListener("click", () => {
    const qty = Number(qtyInput.value) || 1;
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[id] = (cart[id] || 0) + qty;
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("已加入購物車！");
    updateCartCount();
  });
  function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  document.getElementById("cart-count").innerText = count;
}

// 页面加载时更新
updateCartCount();
}
document.addEventListener("DOMContentLoaded", loadProduct);

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