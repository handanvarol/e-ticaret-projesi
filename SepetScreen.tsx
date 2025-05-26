import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, Linking, ScrollView } from 'react-native';

type Urun = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  adet: number;
};

const INITIAL_URUNLER: Urun[] = [
  {
    id: '1',
    name: 'Kırmızı Tişört',
    price: 199.99,
    imgUrl: 'data:image/jpeg;base64,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',
    adet: 1,
  },
  {
    id: '2',
    name: 'Beyaz Tişört',
    price: 500,
    imgUrl: 'data:image/jpeg;base64,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',
    adet: 2,
  },{
    id: '1',
    name: 'siyah Tişört',
    price: 600,
    imgUrl: 'data:image/jpeg;base64,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',
    adet: 1,
  },{
    id: '1',
    name: 'Kırmızı Tişört',
    price: 199.99,
    imgUrl: 'data:image/jpeg;base64,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',
    adet: 1,
  },{
    id: '1',
    name: 'mor Tişört',
    price: 199.99,
    imgUrl: 'data:image/jpeg;base64,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',
    adet: 2,
  },
];

export default function SepetScreen() {
  const [urunler, setUrunler] = useState<Urun[]>(INITIAL_URUNLER);
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [telefon, setTelefon] = useState('');
  const [mail, setMail] = useState('');
  const [adres, setAdres] = useState('');
  const [puan, setPuan] = useState('');
  const [yorum, setYorum] = useState('');

  const toplam = urunler.reduce((acc, item) => acc + item.price * item.adet, 0);

  const handleSiparisOnayla = () => {
    alert('Siparişiniz alındı! (Demo)');
  };

  const handleYorumGonder = () => {
    if (!puan || !yorum) {
      alert('Lütfen puan ve yorumunuzu girin.');
      return;
    }
    alert('Yorumunuz alındı! Teşekkürler 🙏');
    setPuan('');
    setYorum('');
  };

  const handleDestek = () => {
    Linking.openURL('tel:05350592939');
  };

  // TİPLİ fonksiyonlar!
  const urunAdetArtir = (id: string) => {
    setUrunler(prev =>
      prev.map(item =>
        item.id === id ? { ...item, adet: item.adet + 1 } : item
      )
    );
  };

  const urunAdetAzalt = (id: string) => {
    setUrunler(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, adet: item.adet - 1 } : item
        )
        .filter(item => item.adet > 0)
    );
  };

  const urunSil = (id: string) => {
    setUrunler(prev => prev.filter(item => item.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Sol üstte "Alışverişe Devam Et" butonu */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity style={styles.devamBtn} onPress={() => { /* ileride fonksiyon eklenir */ }}>
          <Text style={styles.devamBtnText}>← Alışverişe Devam Et</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Sepetim</Text>

      <FlatList
        data={urunler}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imgUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.adetRow}>
                <TouchableOpacity style={styles.adetBtn} onPress={() => urunAdetAzalt(item.id)}>
                  <Text style={styles.adetBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.adet}>{item.adet}</Text>
                <TouchableOpacity style={styles.adetBtn} onPress={() => urunAdetArtir(item.id)}>
                  <Text style={styles.adetBtnText}>+</Text>
                </TouchableOpacity>
                <Text style={{ marginLeft: 12, fontWeight: 'bold', color: '#888' }}>
                  {(item.price * item.adet).toFixed(2)} TL
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.silBtn} onPress={() => urunSil(item.id)}>
              <Text style={styles.silBtnText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Sepetiniz boş</Text>}
        scrollEnabled={false}
      />

      <Text style={styles.total}>Toplam: {toplam.toFixed(2)} TL</Text>

      {/* Kullanıcı Bilgi Formu */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Teslimat Bilgileri</Text>
        <TextInput placeholder="Ad" value={ad} onChangeText={setAd} style={styles.input} />
        <TextInput placeholder="Soyad" value={soyad} onChangeText={setSoyad} style={styles.input} />
        <TextInput placeholder="Telefon" keyboardType="phone-pad" value={telefon} onChangeText={setTelefon} style={styles.input} />
        <TextInput placeholder="Mail" keyboardType="email-address" value={mail} onChangeText={setMail} style={styles.input} />
        <TextInput placeholder="Adres" value={adres} onChangeText={setAdres} style={[styles.input, {height: 60}]} multiline />
      </View>

      <TouchableOpacity style={styles.siparisBtn} onPress={handleSiparisOnayla}>
        <Text style={styles.siparisBtnText}>Siparişi Onayla</Text>
      </TouchableOpacity>

      <Text style={styles.warning}>Yalnızca kapıda ödeme vardır!</Text>

      {/* Puan ve Yorum */}
      <View style={styles.puanYorum}>
        <Text style={styles.formTitle}>Puan ve Yorum Bırak</Text>
        <TextInput placeholder="Puan (1-5)" value={puan} onChangeText={setPuan} keyboardType="numeric" style={styles.input} maxLength={1} />
        <TextInput placeholder="Yorumunuz" value={yorum} onChangeText={setYorum} style={[styles.input, {height: 60}]} multiline />
        <TouchableOpacity style={styles.yorumBtn} onPress={handleYorumGonder}>
          <Text style={styles.yorumBtnText}>Yorumu Gönder</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.destekBtn} onPress={handleDestek}>
        <Text style={styles.destekBtnText}>Yardım & Destek için 05350592939'ı Ara</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  devamBtn: {
    backgroundColor: "#fbc02d",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  devamBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 12, textAlign: 'left' },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  image: { width: 64, height: 64, borderRadius: 10, marginRight: 12 },
  info: { flex: 1, minWidth: 110 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 2 },
  adetRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  adetBtn: {
    width: 32,
    height: 32,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  adetBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  adet: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 8,
    minWidth: 18,
    textAlign: "center",
  },
  silBtn: {
    marginLeft: 7,
    padding: 6,
    borderRadius: 7,
    backgroundColor: "#ffcdd2",
    alignItems: "center",
    justifyContent: "center",
  },
  silBtnText: {
    fontSize: 18,
    color: "#c62828",
  },
  total: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    color: "#4caf50",
    marginBottom: 12,
  },
  form: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  formTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: "#2e2e2e",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 8,
    marginBottom: 7,
  },
  siparisBtn: {
    backgroundColor: "#4caf50",
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
    marginTop: 5,
  },
  siparisBtnText: { color: "#fff", fontWeight: "bold", fontSize: 17 },
  warning: {
    color: "#e53935",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  puanYorum: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  yorumBtn: {
    backgroundColor: "#ffa726",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  yorumBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  destekBtn: {
    backgroundColor: "#1976d2",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  destekBtnText: { color: "#fff", fontWeight: "bold" },
});
