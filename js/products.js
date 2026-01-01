// ================= 商品資料 =================
const products = [
  { 
    id: "1", 
    name: "冒險者帆布袋", 
    price: 299, 
    desc: "適合冒險者日常使用的帆布袋。", 
    //longDesc: "本商品以冒險世界觀為設計概念，適合日常外出、課程或旅行使用。大容量設計，兼顧實用與風格。",
    img: "images/item1.jpg",
    images: ["images/item1_2.jpg", "images/item1_3.jpg"],
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
    images: ["images/item1-2.jpg", "images/item1-3.jpg"],
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
    img: "images/item3.jpg",
    images: ["images/item1-2.jpg", "images/item1-3.jpg"],
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
    img: "images/item4.jpg",
    images: ["images/item1-2.jpg", "images/item1-3.jpg"],
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
    img: "images/item5.jpg",
    images: ["images/item1-2.jpg", "images/item1-3.jpg"],
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
    img: "images/item6.jpg",
    images: ["images/item1-2.jpg", "images/item1-3.jpg"],
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
    img: "images/item7.jpg",
    images: ["images/item1-2.jpg", "images/item1-3.jpg"],
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
    img: "images/item8.jpg",
    images: ["images/item1-2.jpg", "images/item1-3.jpg"],
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
    img: "images/item9.jpg",
    images: ["images/item1-2.jpg", "images/item1-3.jpg"],
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
    img: "images/item10.jpg",
    images: ["images/item1-2.jpg", "images/item1-3.jpg"],
    specs: [
      "材質：帆布 / 塑料 / 金屬",
      "尺寸：約 30 × 40 cm",
      "產地：設計概念商品"]
  }
];
