// ================= 購物車數量顯示（全站共用） =================
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
