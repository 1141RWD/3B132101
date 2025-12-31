const products = {
  1: {
    name: "冒險者帆布袋",
    price: 299,
    desc: "適合冒險者日常使用的帆布袋。",
    img: "images/item1.jpg"
  },
  2: {
    name: "盲盒",
    price: 99,
    desc: "多款元素符文設計貼紙。",
    img: "images/item2.jpg"
  },
  3: {
    name: "吧唧",
    price: 199,
    desc: "角色主題壓克力鑰匙圈，輕巧耐用。",
    img: "images/item3.jpg"
  },
  4: {
    name: "玩偶",
    price: 259,
    desc: "印有幻想世界圖樣的陶瓷馬克杯。",
    img: "images/item4.jpg"
  },
  5: {
    name: "立牌",
    price: 349,
    desc: "大型滑鼠墊，圖樣來自幻想冒險地圖。",
    img: "images/item5.jpg"
  },
  6: {
    name: "海报",
    price: 129,
    desc: "金屬製作的公會徽章胸章。",
    img: "images/item6.jpg"
  },
  7: {
    name: "桌垫",
    price: 199,
    desc: "高品質輸出的角色概念立繪海報。",
    img: "images/item7.jpg"
  },
  8: {
    name: "鼠标垫",
    price: 179,
    desc: "封面採用幻想風格插畫的筆記本。",
    img: "images/item8.jpg"
  },
  9: {
    name: "马克杯",
    price: 149,
    desc: "可燙印或縫製的冒險者主題貼布章。",
    img: "images/item9.jpg"
  },
  10: {
    name: "鼠标垫",
    price: 149,
    desc: "可燙印或縫製的冒險者主題貼布章。",
    img: "images/item10.jpg"
  }
};

function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = products[id];

  if (!p) {
    document.querySelector(".detail").innerHTML =
      "<p>找不到該商品</p>";
    return;
  }

  document.getElementById("product-img").src = p.img;
  document.getElementById("product-name").innerText = p.name;
  document.getElementById("product-price").innerText = `$${p.price}`;
  document.getElementById("product-desc").innerText = p.desc;
}
