// Sabit admin giriş bilgileri
const adminEmail = "varolhandandilara@gmail.com";
const adminSifre = "123456";

document.getElementById("girisForm").onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const sifre = document.getElementById("password").value.trim();
  const robot = document.getElementById("robotDegilim").checked;
  const hata = document.getElementById("girisHata");

  if (!robot) {
    hata.textContent = "Lütfen robot olmadığınızı doğrulayın.";
    return;
  }

  if (email === adminEmail && sifre === adminSifre) {
    hata.textContent = "";
    window.location.href = "admin.html";
  } else {
    hata.textContent = "Hatalı e-posta veya şifre!";
  }
};

// Şifreyi göster/gizle özelliği
document.getElementById("sifreGoz").onclick = function() {
  const sifreInput = document.getElementById("password");
  if (sifreInput.type === "password") {
    sifreInput.type = "text";
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
  } else {
    sifreInput.type = "password";
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
  }
};
