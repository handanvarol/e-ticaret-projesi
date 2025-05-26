function guncelleSepet() {
  const sepet = JSON.parse(localStorage.getItem('sepet')) || [];
  const sepetDiv = document.getElementById("sepet-urunler");
  const toplamSpan = document.getElementById("toplam-fiyat");
  sepetDiv.innerHTML = "";
  let toplam = 0;
  if(sepet.length === 0){
    sepetDiv.innerHTML = "<div>Sepetiniz boş.</div>";
    toplamSpan.textContent = "0 ₺";
    return;
  }
  sepet.forEach((urun, i) => {
    const urunToplam = urun.price * urun.adet;
    toplam += urunToplam;
    sepetDiv.innerHTML += `
      <div class="sepet-urun">
        <img src="${urun.imgUrl}">
        <div>
          <div class="sepet-ad">${urun.name}</div>
          <div>Beden: ${urun.beden}</div>
          <div>Adet: ${urun.adet}</div>
          <div>Fiyat: ${urun.price} ₺</div>
          <div>Toplam: ${urunToplam} ₺</div>
        </div>
        <button onclick="sepettenSil(${i})">Sil</button>
      </div>
    `;
  });
  toplamSpan.textContent = toplam + " ₺";
}

function sepettenSil(index){
  let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
  sepet.splice(index,1);
  localStorage.setItem('sepet', JSON.stringify(sepet));
  guncelleSepet();
}

window.onload = guncelleSepet;

// Sepet işlemleri aynı kalsın

// Yorum ve puan modalı için kodları window.onload'un içine koy!
window.onload = function() {
  guncelleSepet();

  // MODAL aç-kapat
  const yorumBtn = document.getElementById("yorumPuanBtn");
  const yorumModal = document.getElementById("yorumModal");
  const yorumKapatBtn = document.getElementById("yorumKapatBtn");
  const yorumGonderBtn = document.getElementById("yorumGonderBtn");
  const yorumMetin = document.getElementById("yorumMetin");
  const yorumUyari = document.getElementById("yorumUyari");
  let seciliPuan = 0;
  const yildizlar = document.querySelectorAll("#yildizlar .yildiz");

  if(yorumBtn){
    // Buton varsa modalı aç
    yorumBtn.onclick = () => {
      yorumModal.style.display = "flex";
      yorumUyari.textContent = "";
      yorumMetin.value = "";
      seciliPuan = 0;
      yildizlar.forEach(y => y.classList.remove("selected"));
    };
  }
  if(yorumKapatBtn){
    yorumKapatBtn.onclick = () => {
      yorumModal.style.display = "none";
    };
  }
  yildizlar.forEach(y => {
    y.onclick = function() {
      seciliPuan = Number(y.getAttribute("data-puan"));
      yildizlar.forEach(s => s.classList.toggle("selected", Number(s.getAttribute("data-puan")) <= seciliPuan));
    };
  });
  if(yorumGonderBtn){
    yorumGonderBtn.onclick = () => {
      const metin = yorumMetin.value.trim();
      if (!seciliPuan) {
        yorumUyari.textContent = "Lütfen puan veriniz!";
        return;
      }
      if (metin.length < 3) {
        yorumUyari.textContent = "Lütfen en az 3 karakterlik yorum yazınız!";
        return;
      }
      yorumUyari.style.color = "green";
      yorumUyari.textContent = "Teşekkürler, yorumunuz alındı!";
      setTimeout(() => {
        yorumModal.style.display = "none";
        yorumUyari.style.color = "red";
      }, 1300);
    };
  }
};document.getElementById("siparisForm").onsubmit = function(e) {
  e.preventDefault();
  const sepet = JSON.parse(localStorage.getItem('sepet')) || [];
  if(sepet.length === 0){
    alert("Sepetiniz boş!");
    return;
  }

  // Sipariş işlemleri...

  // Sepeti temizle
  localStorage.removeItem("sepet");
  guncelleSepet();

  // Sipariş onay mesajını göster
  document.getElementById("siparisOnay").style.display = "block";

  // 2 saniye sonra ana sayfaya yönlendir
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
};

