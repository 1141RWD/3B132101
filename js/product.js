// ================= 商品資料（或再從 main.js 取同一資料來源） =================
const products = [
  { 
    id: "1", 
    name: "冒險者帆布袋", 
    price: 299, 
    desc: "適合冒險者日常使用的帆布袋。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: ["images/item1.jpg", "images/item1-2.jpg", "images/item1-3.jpg"],
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  },
  { 
    id: "2", 
    name: "盲盒", 
    price: 99,
    desc: "神秘角色盲盒。",
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item2.jpg",
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  },
  { 
    id: "3", 
    name: "吧唧", 
    price: 199, 
    desc: "可愛角色吧唧。",
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。", 
    img: "images/item3.jpg" ,
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  },
  { 
    id: "4", 
    name: "玩偶", 
    price: 599, 
    desc: "冒險主題玩偶。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item4.jpg" ,
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  },
  { 
    id: "5", 
    name: "立牌", 
    price: 299, 
    desc: "角色立牌，精美收藏。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item5.jpg" ,
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  },
  { 
    id: "6", 
    name: "海报", 
    price: 299, 
    desc: "幻想世界海報。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item6.jpg" ,
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  },
  { 
    id: "7", 
    name: "桌垫", 
    price: 299, 
    desc: "大尺寸桌垫。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item7.jpg" ,
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  },
  { 
    id: "8", 
    name: "鼠标垫", 
    price: 299, 
    desc: "舒適鼠标垫。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item8.jpg" ,
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  },
  { 
    id: "9", 
    name: "马克杯", 
    price: 299, 
    desc: "印有插畫馬克杯。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item9.jpg" ,
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  },
  { 
    id: "10", 
    name: "椅子", 
    price: 299, 
    desc: "冒險者專用椅子。", 
    longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item10.jpg" ,
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  }
];

// ================= 載入商品資料 =================
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = products.find(item => item.id === id);
  if (!p) return;

  // 商品基本資訊
  document.getElementById("product-name").innerText = p.name;
  document.getElementById("product-price").innerText = `$${p.price}`;
  document.getElementById("product-desc").innerText = p.desc;

  // 商品圖片展示
  const imgContainer = document.getElementById("product-img-container");
  imgContainer.innerHTML = "";
  p.images.forEach(src => {
    const imgEl = document.createElement("img");
    imgEl.src = src;
    imgEl.alt = p.name;
    imgEl.style.maxWidth = "100%";
    imgEl.style.marginBottom = "10px";
    imgContainer.appendChild(imgEl);
  });

  // 商品介紹 Tab
  const descPanel = document.getElementById("desc");
  descPanel.innerHTML = "";
  p.images.forEach(src => {
    const imgEl = document.createElement("img");
    imgEl.src = src;
    imgEl.style.maxWidth = "100%";
    imgEl.style.marginBottom = "15px";
    descPanel.appendChild(imgEl);
  });
  const pText = document.createElement("p");
  pText.innerText = p.longDesc;
  descPanel.appendChild(pText);

  // 商品規格 Tab
  const specPanel = document.getElementById("spec");
  specPanel.innerHTML = "";
  const ul = document.createElement("ul");
  p.specs.forEach(spec => {
    const li = document.createElement("li");
    li.innerText = spec;
    ul.appendChild(li);
  });
  specPanel.appendChild(ul);

  // 購物車功能
  const cartBtn = document.getElementById("add-cart-btn");
  const qtyInput = document.getElementById("product-qty");
  cartBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const qty = Number(qtyInput.value) || 1;
    cart[id] = (cart[id] || 0) + qty;
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("已加入購物車！");
  });

  // ================= Tab 切換功能 =================
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

  // ================= 深色模式適配 =================
  if (document.documentElement.classList.contains("dark")) {
    document.body.classList.add("dark");
  }
}

document.addEventListener("DOMContentLoaded", loadProduct);