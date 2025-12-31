// ================= 商品資料（或再從 main.js 取同一資料來源） =================
const products = [
  { 
    id: "1", 
    name: "冒險者帆布袋", 
    price: 299, 
    desc: "適合冒險者日常使用的帆布袋。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item1.jpg" 
  },
  { 
    id: "2", 
    name: "盲盒", 
    price: 99,
    desc: "神秘角色盲盒。",
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item2.jpg"
  },
  { 
    id: "3", 
    name: "吧唧", 
    price: 199, 
    desc: "可愛角色吧唧。",
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。", 
    img: "images/item3.jpg" 
  },
  { 
    id: "4", 
    name: "玩偶", 
    price: 599, 
    desc: "冒險主題玩偶。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item4.jpg" 
  },
  { 
    id: "5", 
    name: "立牌", 
    price: 299, 
    desc: "角色立牌，精美收藏。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item5.jpg" 
  },
  { 
    id: "6", 
    name: "海报", 
    price: 299, 
    desc: "幻想世界海報。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item6.jpg" 
  },
  { 
    id: "7", 
    name: "桌垫", 
    price: 299, 
    desc: "大尺寸桌垫。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item7.jpg" 
  },
  { 
    id: "8", 
    name: "鼠标垫", 
    price: 299, 
    desc: "舒適鼠标垫。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item8.jpg" 
  },
  { 
    id: "9", 
    name: "马克杯", 
    price: 299, 
    desc: "印有插畫馬克杯。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item9.jpg" 
  },
  { 
    id: "10", 
    name: "椅子", 
    price: 299, 
    desc: "冒險者專用椅子。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item10.jpg" 
  }
];

// ================= 載入商品資料 =================
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const p = products.find(p => p.id === id);
  if (!p) return;

  document.getElementById("product-img").src = p.img;
  document.getElementById("product-img").alt = p.name;

  document.getElementById("product-name").innerText = p.name;
  document.getElementById("product-price").innerText = `$${p.price}`;
  document.getElementById("product-desc").innerText = p.desc;

  document.getElementById("product-long-desc").innerHTML = p.longDesc;

  // 加入購物車按鈕
  document.getElementById("add-cart-btn").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[id] = (cart[id] || 0) + Number(document.getElementById("product-qty").value);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("已加入購物車！");
  });

  // ================= 商品介紹 Tabs 切換 =================
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
});

}
