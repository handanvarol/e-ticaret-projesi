import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase config'inle doldur!
const firebaseConfig = {
  apiKey: "AIzaSyCnnqHe05mVYJkerDFYCXO2qdHp3FaC8hg",
  authDomain: "e-ticarettt-782bd.firebaseapp.com",
  projectId: "e-ticarettt-782bd",
  storageBucket: "e-ticarettt-782bd.firebasestorage.app",
  messagingSenderId: "1034276529408",
  appId: "1:1034276529408:web:0e27b821a809b65c85ffe5",
  measurementId: "G-89WFCF0PVK"
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Animasyonlu başlıklar ve açıklamalar
const bannerVeriler = [
  {
    baslik: "Süper Fırsat!",
    aciklama: "Stoklarla sınırlı süper indirim! 👕",
    icon: "data:image/jpeg;base64,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"
  },
  {
    baslik: "Yaz Koleksiyonu",
    aciklama: "Yaz koleksiyonu şimdi %30 indirimli!",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRroMPc4BZQYJbhlfBJIUNLAWIY_G5_v-SKOA&s"
  },
  {
    baslik: "Sürprizler Sepette!",
    aciklama: "Sepete özel kampanyalar seni bekliyor!",
    icon: "data:image/jpeg;base64,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"
  },
  {
    baslik: "Haftanın Favorileri",
    aciklama: "En çok beğenilen tişörtler burada!",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQJDuadabtScBABjr9IGbaQ1GRiehl-R_BFUp8sD3qZDIlNhabKLpqhn4Kbl2aNxsPBYc&usqp=CAU"
  }
];
let bannerIndex = 0;

function degistirBanner() {
  const b = bannerVeriler[bannerIndex];
  document.getElementById("banner-baslik").textContent = b.baslik;
  document.getElementById("banner-aciklama").textContent = b.aciklama;
  document.getElementById("banner-icon").src = b.icon;
  // Animasyon için kısa opacity geçişi
  document.querySelector(".super-banner").style.opacity = ".7";
  setTimeout(() => {
    document.querySelector(".super-banner").style.opacity = "1";
  }, 160);
}

setInterval(() => {
  bannerIndex = (bannerIndex + 1) % bannerVeriler.length;
  degistirBanner();
}, 3400);

degistirBanner();

// --- SEPET FONKSİYONLARI ---

function sepeteEkle(product, seciliBeden) {
  let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
  // Aynı ürün ve aynı beden varsa miktarı artır
  const idx = sepet.findIndex(item => item.id === product.id && item.beden === seciliBeden);
  if (idx > -1) {
    sepet[idx].adet += 1;
  } else {
    sepet.push({ ...product, adet: 1, beden: seciliBeden });
  }
  localStorage.setItem("sepet", JSON.stringify(sepet));
  gosterBildirim(`${product.name} (${seciliBeden}) sepete eklendi!`);
}

function gosterBildirim(msg) {
  let el = document.getElementById("sepet-bildirim");
  if (!el) {
    el = document.createElement("div");
    el.id = "sepet-bildirim";
    el.style.position = "fixed";
    el.style.right = "34px";
    el.style.bottom = "93px";
    el.style.background = "linear-gradient(90deg,#1464fa,#49befb)";
    el.style.color = "#fff";
    el.style.padding = "15px 26px";
    el.style.borderRadius = "13px";
    el.style.fontSize = "1.08em";
    el.style.fontWeight = "bold";
    el.style.boxShadow = "0 2px 17px #bfd2f7";
    el.style.zIndex = 2000;
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 1800);
}

// --- Tişörtleri ÇEK ve Kartları OLUŞTUR ---
async function tisortleriGetir() {
  const grid = document.getElementById("tisortler-grid");
  grid.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "shirts"));
  querySnapshot.forEach((docu) => {
    const data = docu.data();
    const bedenler = data.bedenler || ["S", "M", "L", "XL"];
    const tisortData = {
      id: docu.id,
      name: data.name,
      imgUrl: data.imgUrl,
      price: data.price,
      desc: data.desc,
      renkler: data.renkler || [],
      bedenler: bedenler,
      stock: data.stock
    };
    // BEDEN SELECT HTML'i oluştur
    const selectId = `bedenSec-${docu.id}`;
    grid.innerHTML += `
      <div class="tisort-card">
        <img src="${tisortData.imgUrl || 'https://cdn-icons-png.flaticon.com/512/189/189792.png'}" alt="${tisortData.name}">
        <div class="tisort-ad">${tisortData.name}</div>
        <div class="tisort-desc">${tisortData.desc || ''}</div>
        <div class="tisort-renkler">Renkler: ${tisortData.renkler.join(", ")}</div>
        <div class="tisort-fiyat">Fiyat: ${tisortData.price} ₺</div>
        <div class="tisort-stok">Stok: ${tisortData.stock}</div>
        <label class="beden-label" for="${selectId}">Beden Seç: </label>
        <select class="beden-select" id="${selectId}">
          <option value="">Seçiniz</option>
          ${bedenler.map(b => `<option value="${b}">${b}</option>`).join("")}
        </select>
        <button class="sepete-ekle-btn" data-id="${tisortData.id}">
          <i class="fa-solid fa-cart-plus"></i> Sepete Ekle
        </button>
      </div>
    `;
  });

  // Butonlara tıklama eventleri ekle
  setTimeout(() => {
    document.querySelectorAll(".sepete-ekle-btn").forEach(btn => {
      btn.onclick = function () {
        const id = btn.getAttribute("data-id");
        const card = btn.closest(".tisort-card");
        // BEDEN kontrolü
        const select = card.querySelector(".beden-select");
        const seciliBeden = select.value;
        if (!seciliBeden) {
          gosterBildirim("Lütfen beden seçiniz!");
          select.style.borderColor = "#e33737";
          setTimeout(() => { select.style.borderColor = "#dde6fa"; }, 1300);
          return;
        }
        sepeteEkle({
          id,
          name: card.querySelector(".tisort-ad").textContent,
          imgUrl: card.querySelector("img").getAttribute("src"),
          price: Number(card.querySelector(".tisort-fiyat").textContent.replace(/[^\d.,]/g,"").replace(",",".")), // Daha güvenli fiyat parse
          desc: card.querySelector(".tisort-desc").textContent,
          renkler: card.querySelector(".tisort-renkler").textContent.replace("Renkler:","").trim().split(","),
          beden: seciliBeden, // <<--- BU!
          stock: Number(card.querySelector(".tisort-stok").textContent.replace(/[^\d]/g,""))
        }, seciliBeden);
        
      }
    });
  }, 300);
}
tisortleriGetir();
