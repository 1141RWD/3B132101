/* ================= 購物車頁面 cart.js ================= */

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const backToTopBtn = document.getElementById("backToTop");
  const themeToggle = document.getElementById("themeToggle");

  if (!cartItemsEl || !cartTotalEl) return;

  // 读取购物车
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  let selectedItems = {}; // 记录勾选状态

  // ===== 渲染购物车 =====
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
        <td>
          <input type="checkbox" class="cart-checkbox" data-id="${id}" ${selectedItems[id] ? "checked" : ""}>
        </td>

        <td>
          <div class="cart-product">
            <img src="${product.img}" alt="${product.name}" class="cart-img">
          </div>
        </td>

        <td>${product.name}</td>

        <td>$${product.price}</td>

        <td>
          <input type="number"
                 min="1"
                 value="${qty}"
                 class="cart-qty"
                 data-id="${id}">
        </td>

        <td>$${subtotal}</td>

        <td>
          <button class="remove-btn" data-id="${id}">刪除</button>
        </td>
      `;

      cartItemsEl.appendChild(tr);

      // 计算总价，只加已勾选的商品
      if (selectedItems[id]) {
        total += subtotal;
      }
    });

    cartTotalEl.textContent = total;

    // 同步右上角数字
    if (typeof updateCartCount === "function") {
      updateCartCount();
    }
  }

  // ===== 事件委托：数量变化 / 勾选变化 / 删除 =====
  cartItemsEl.addEventListener("change", e => {
    const target = e.target;

    // 数量变化
    if (target.classList.contains("cart-qty")) {
      const id = target.dataset.id;
      const qty = parseInt(target.value, 10);
      if (qty < 1) return;
      cart[id] = qty;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }

    // 勾选变化
    if (target.classList.contains("cart-checkbox")) {
      const id = target.dataset.id;
      selectedItems[id] = target.checked;
      renderCart();
    }
  });

  // 删除商品
  cartItemsEl.addEventListener("click", e => {
    if (!e.target.classList.contains("remove-btn")) return;

    const id = e.target.dataset.id;
    delete cart[id];
    delete selectedItems[id]; // 同时删除勾选状态
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  // ===== 回到顶部按钮 =====
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== 主题切换 =====
  if (themeToggle) {
    if (document.documentElement.classList.contains("dark")) {
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }

    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      document.body.classList.toggle("dark");
      const isDark = document.documentElement.classList.contains("dark");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // 初次渲染
  renderCart();
});
