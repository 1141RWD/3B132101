document.addEventListener("DOMContentLoaded", () => {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const backToTopBtn = document.getElementById("backToTop");

  if (!cartItemsEl || !cartTotalEl) return;

  // 读取购物车
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  function renderCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    Object.keys(cart).forEach(id => {
      const product = products.find(p => p.id == id);
      if (!product) return;

      const qty = cart[id];
      const subtotal = product.price * qty;
      total += subtotal;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="checkbox"></td>

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
    });

    cartTotalEl.textContent = total;

    // 同步 navbar 购物车数量
    if (typeof updateCartCount === "function") {
      updateCartCount();
    }
  }

  /* ===== 数量变更 ===== */
  cartItemsEl.addEventListener("change", e => {
    if (!e.target.classList.contains("cart-qty")) return;

    const id = e.target.dataset.id;
    const qty = parseInt(e.target.value, 10);

    if (qty < 1) return;

    cart[id] = qty;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  /* ===== 删除商品 ===== */
  cartItemsEl.addEventListener("click", e => {
    if (!e.target.classList.contains("remove-btn")) return;

    const id = e.target.dataset.id;
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  /* ===== 回到最上方 ===== */
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  renderCart();
});
