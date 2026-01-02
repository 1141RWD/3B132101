// =================== 结账函数 ===================
function checkout() {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  const checkboxes = cartItemsEl.querySelectorAll(".cart-checkbox");

  let total = 0;
  let hasChecked = false;

  checkboxes.forEach(cb => {
    const id = cb.dataset.id;
    if (cb.checked) {
      const tr = cb.closest("tr");
      const subtotalEl = tr.querySelector("td:nth-child(6)");
      const subtotal = subtotalEl ? parseInt(subtotalEl.textContent.replace("$", "")) : 0;
      total += subtotal;
      hasChecked = true;

      // 移除购物车数据
      delete cart[id];
    }
  });

  if (!hasChecked) {
    alert("請先勾選商品再結帳！");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`結帳金額：$${total}\n感謝您的購買！`);

  // 重新渲染购物车
  if (typeof renderCart === "function") renderCart();

  // 弹窗关闭后刷新页面
  location.reload();
}
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const themeToggle = document.getElementById("themeToggle");

  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  let selectedItems = {}; // 保存勾选状态

  function renderCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    Object.keys(cart).forEach(id => {
      const product = products.find(p => p.id == id);
      if (!product) return;
      const qty = cart[id];
      const subtotal = product.price * qty;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="checkbox" class="cart-checkbox" data-id="${id}" ${selectedItems[id] ? "checked" : ""}></td>
        <td><div class="cart-product">
            <img src="${product.img}" alt="${product.name}" class="cart-img">
          </div></td>
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td><input type="number" class="cart-qty" min="1" value="${qty}" data-id="${id}"></td>
        <td>$${subtotal}</td>
        <td><button class="remove-btn" data-id="${id}">刪除</button></td>
      `;

      cartItemsEl.appendChild(tr);

      // 总价只加已勾选
      if (selectedItems[id]) total += subtotal;
    });

    cartTotalEl.textContent = total;
    if (typeof updateCartCount === "function") updateCartCount();
  }

  // 事件委托：数量和勾选变化
  cartItemsEl.addEventListener("change", e => {
    const target = e.target;
    if (target.classList.contains("cart-qty")) {
      const id = target.dataset.id;
      const qty = parseInt(target.value);
      if (qty < 1) return;
      cart[id] = qty;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
    if (target.classList.contains("cart-checkbox")) {
      selectedItems[target.dataset.id] = target.checked;
      renderCart();
    }
  });

  // 删除商品
  cartItemsEl.addEventListener("click", e => {
    if (!e.target.classList.contains("remove-btn")) return;
    const id = e.target.dataset.id;
    delete cart[id];
    delete selectedItems[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

   /* ===== 主题切换 ===== */
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  // 初始化主题
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }

  // 点击切换
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    document.body.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

  renderCart();
});
