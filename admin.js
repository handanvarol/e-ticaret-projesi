import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Kendi firebaseConfig'in ile değiştir!
const firebaseConfig = {
  apiKey: "AIzaSyCnnqHe05mVYJkerDFYCXO2qdHp3FaC8hg",
  authDomain: "e-ticarettt-782bd.firebaseapp.com",
  projectId: "e-ticarettt-782bd",
  storageBucket: "e-ticarettt-782bd.firebasestorage.app",
  messagingSenderId: "1034276529408",
  appId: "1:1034276529408:web:0e27b821a809b65c85ffe5",
  measurementId: "G-89WFCF0PVK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("cikisBtn").onclick = function() {
  window.location.href = "admin_giris.html";
};

// Ürün Ekleme
document.getElementById("tisort-form").onsubmit = async function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = Number(document.getElementById("price").value);
  const stock = Number(document.getElementById("stock").value);
  const imgUrl = document.getElementById("foto").value;
  const desc = document.getElementById("desc").value;
  const renkler = Array.from(document.querySelectorAll(".renk-check:checked")).map(x => x.value);
  await addDoc(collection(db, "shirts"), { name, price, stock, imgUrl, renkler, desc });
  this.reset();
  tisortleriListele();
};

// Ürünleri listele + stok tablosunu güncelle
async function tisortleriListele() {
  const kartlar = document.getElementById("tisortler-kartlar");
  const stokBody = document.getElementById("stok-ozet-body");
  kartlar.innerHTML = "";
  stokBody.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "shirts"));
  let toplamStok = 0;
  querySnapshot.forEach((docu) => {
    const data = docu.data();
    // Kartlar:
    kartlar.innerHTML += `
      <div class="tisort-kart" id="card-${docu.id}">
        <img src="${data.imgUrl}" alt="">
        <div class="isim">${data.name}</div>
        <div class="detay">Fiyat: <b>${data.price}₺</b></div>
        <div class="detay">Stok: <b>${data.stock}</b></div>
        <div class="renkler"><b>${(data.renkler||[]).join(", ")}</b></div>
        <div class="desc">${data.desc || ''}</div>
        <div class="btn-row">
          <button class="duzenle-btn" data-id="${docu.id}">Düzenle</button>
          <button class="sil-btn" data-id="${docu.id}">Sil</button>
        </div>
      </div>
    `;
    // Stok tablosu:
    let stokSinif = "stok-cok";
    if(data.stock <= 5) stokSinif = "stok-az";
    else if(data.stock <= 20) stokSinif = "stok-orta";
    toplamStok += Number(data.stock) || 0;
    stokBody.innerHTML += `
      <tr>
        <td>${data.name}</td>
        <td class="${stokSinif}">${data.stock}</td>
      </tr>
    `;
  });
  // Toplam satırı ekle
  stokBody.innerHTML += `
    <tr>
      <td><b>Toplam</b></td>
      <td style="font-weight:bold;">${toplamStok}</td>
    </tr>
  `;
}
tisortleriListele();

// Sil ve Düzenle
document.getElementById("tisortler-kartlar").onclick = async function(e) {
  if (e.target.classList.contains("sil-btn")) {
    const id = e.target.getAttribute("data-id");
    if (!confirm("Bu tişörtü silmek istiyor musunuz?")) return;
    await deleteDoc(doc(db, "shirts", id));
    tisortleriListele();
  }
  if (e.target.classList.contains("duzenle-btn")) {
    const id = e.target.getAttribute("data-id");
    let data;
    const querySnapshot = await getDocs(collection(db, "shirts"));
    querySnapshot.forEach((docu) => {
      if (docu.id === id) data = docu.data();
    });
    document.getElementById("duzenle-id").value = id;
    document.getElementById("duzenle-name").value = data.name;
    document.getElementById("duzenle-price").value = data.price;
    document.getElementById("duzenle-stock").value = data.stock;
    document.getElementById("duzenle-foto").value = data.imgUrl;
    document.getElementById("duzenle-desc").value = data.desc || '';
    // Renkler
    const renkler = ["Beyaz","Siyah","Kırmızı","Mavi","Yeşil","Sarı","Gri","Mor","Pembe","Kahverengi"];
    let renklerHTML = "";
    renkler.forEach(r => {
      const checked = (data.renkler||[]).includes(r) ? "checked" : "";
      renklerHTML += `<label><input type="checkbox" value="${r}" class="duzenle-renk-check" ${checked}> ${r}</label>`;
    });
    document.getElementById("duzenle-renkler").innerHTML = renklerHTML;
    document.getElementById("duzenle-modal").style.display = "flex";
  }
};

// Modalı kapat
document.getElementById("modalKapat").onclick = function () {
  document.getElementById("duzenle-modal").style.display = "none";
};
window.onclick = function (event) {
  if (event.target === document.getElementById("duzenle-modal")) {
    document.getElementById("duzenle-modal").style.display = "none";
  }
};

// Modalda Kaydet (Güncelle)
document.getElementById("duzenle-form").onsubmit = async function(e) {
  e.preventDefault();
  const id = document.getElementById("duzenle-id").value;
  const name = document.getElementById("duzenle-name").value;
  const price = Number(document.getElementById("duzenle-price").value);
  const stock = Number(document.getElementById("duzenle-stock").value);
  const imgUrl = document.getElementById("duzenle-foto").value;
  const desc = document.getElementById("duzenle-desc").value;
  const renkler = Array.from(document.querySelectorAll("#duzenle-renkler .duzenle-renk-check:checked")).map(x=>x.value);
  await updateDoc(doc(db, "shirts", id), { name, price, stock, imgUrl, renkler, desc });
  document.getElementById("duzenle-modal").style.display = "none";
  tisortleriListele();
};


// ------- BURADAN SONRA YORUMLAR PANELİ EKLENİYOR --------

// Yorumları çek ve admin panelde göster
async function yorumlariGetir() {
  const yorumlarDiv = document.getElementById("yorumlar-listesi");
  if(!yorumlarDiv) return; // Div yoksa (örn. sayfa tasarımında yoksa) atla
  yorumlarDiv.innerHTML = "<div>Yorumlar yükleniyor...</div>";
  const snapshot = await getDocs(collection(db, "yorumlar"));
  let yorumlar = [];
  snapshot.forEach(docu => {
    yorumlar.push({ id: docu.id, ...docu.data() });
  });
  // Yeni en üstte
  yorumlar = yorumlar.sort((a, b) => (b.tarih?.seconds || 0) - (a.tarih?.seconds || 0));

  yorumlarDiv.innerHTML = yorumlar.length === 0
    ? "<div style='color:#aaa'>Henüz yorum yok.</div>"
    : yorumlar.map(yorum => `
      <div class="yorum-kart">
        <div class="yorum-yildizlar">${"★".repeat(yorum.puan)}${"☆".repeat(5 - yorum.puan)}</div>
        <div class="yorum-txt">${yorum.yorum}</div>
        <div class="yorum-tarih">${yorum.tarih ? new Date(yorum.tarih.seconds*1000).toLocaleString("tr-TR") : ""}</div>
        <button class="yorum-sil-btn" data-id="${yorum.id}">Sil</button>
      </div>
    `).join("");
  // Sil butonları
  document.querySelectorAll(".yorum-sil-btn").forEach(btn => {
    btn.onclick = async function() {
      if (confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
        await deleteDoc(doc(db, "yorumlar", btn.getAttribute("data-id")));
        yorumlariGetir();
      }
    };
  });
}
yorumlariGetir();
