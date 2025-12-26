const products = {
  1: {
    name: "冒險者帆布袋",
    price: "$299",
    desc: "適合冒險者日常使用的帆布袋。",
    img: "images/item1.jpg"
  },
  2: {
    name: "元素符文貼紙組",
    price: "$99",
    desc: "多款元素符文設計貼紙。",
    img: "images/item2.jpg"
  }
};

function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = products[id];

  if (!p) return;

  document.getElementById("product-img").src = p.img;
  document.getElementById("product-name").innerText = p.name;
  document.getElementById("product-price").innerText = p.price;
  document.getElementById("product-desc").innerText = p.desc;
}
