import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// --- KENDİ FIREBASE CONFIGİNİ EKLE! ---
const firebaseConfig = {
  // firebase config burada
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('siparis-form');
const sonuc = document.getElementById('siparis-sonuc');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const adsoyad = document.getElementById('adsoyad').value.trim();
  const adres = document.getElementById('adres').value.trim();
  const telefon = document.getElementById('telefon').value.trim();
  const sepet = JSON.parse(localStorage.getItem("sepet")) || [];
  if (sepet.length === 0) {
    sonuc.textContent = "Sepetiniz boş!";
    return;
  }

  await addDoc(collection(db, "orders"), {
    adsoyad, adres, telefon,
    urunler: sepet,
    tarih: Timestamp.now()
  });

  localStorage.removeItem("sepet");
  sonuc.textContent = "Siparişiniz başarıyla oluşturuldu!";
  form.reset();
  setTimeout(() => { window.location.href = "index.html"; }, 2500);
});
