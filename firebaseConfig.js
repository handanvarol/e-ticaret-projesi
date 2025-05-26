// app/(tabs)/firebaseConfig.js  ← (ya da projenin uygun yerinde)
// Firebase ve Firestore kurulumunu yapar

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// !!! Kendi Firebase projenin ayarları !!!
const firebaseConfig = {
    apiKey: "AIzaSyCnnqHe05mVYJkerDFYCXO2qdHp3FaC8hg",
    authDomain: "e-ticarettt-782bd.firebaseapp.com",
    projectId: "e-ticarettt-782bd",
    storageBucket: "e-ticarettt-782bd.appspot.com",  // .app yerine .app**spot**.com olmalı! 👈
    messagingSenderId: "1034276529408",
    appId: "1:1034276529408:web:0e27b821a809b65c85ffe5",
    measurementId: "G-89WFCF0PVK"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firestore veritabanı nesnesini oluştur
const db = getFirestore(app);

export { db };
