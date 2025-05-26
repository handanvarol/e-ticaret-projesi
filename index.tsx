import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';

type Tisort = {
  id: string;
  name: string;
  desc: string;
  price: number;
  imgUrl: string;
};

type SeciliBeden = { [id: string]: string };

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const BEDENLER = ['S', 'M', 'L', 'XL'];

export default function HomeScreen({ navigation }: Props) {
  const [tisortler, setTisortler] = useState<Tisort[]>([]);
  const [seciliBeden, setSeciliBeden] = useState<SeciliBeden>({});
  const [sepet, setSepet] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "shirts"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tisort));
      setTisortler(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const sepeteEkle = (urun: Tisort) => {
    if (!seciliBeden[urun.id]) {
      alert("Lütfen beden seçiniz!");
      return;
    }
    const eklenenUrun = { ...urun, beden: seciliBeden[urun.id] };
    setSepet(prev => [...prev, eklenenUrun]);
    alert("Ürün sepete eklendi!");
  };

  // "Sepete Git" tuşuna basınca sepete eklenen ürünleri sepet sayfasına gönder
  const handleSepeteGit = () => {
    navigation.navigate('Sepet', { sepetUrunleri: sepet });
  };

  const renderItem = ({ item }: { item: Tisort }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
      <Text style={styles.price}>{item.price} ₺</Text>
      <View style={styles.bedenRow}>
        {BEDENLER.map(beden => (
          <TouchableOpacity
            key={beden}
            style={[
              styles.bedenButton,
              seciliBeden[item.id] === beden && styles.bedenButtonSelected,
            ]}
            onPress={() => setSeciliBeden(prev => ({ ...prev, [item.id]: beden }))}
          >
            <Text style={{
              color: seciliBeden[item.id] === beden ? '#fff' : '#1464fa',
              fontWeight: 'bold'
            }}>
              {beden}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => sepeteEkle(item)}>
        <Text style={styles.buttonText}>Sepete Ekle</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#1464fa" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      {/* SEPETE GİT TUŞU */}
      <TouchableOpacity
        style={{
          backgroundColor: '#1464fa',
          padding: 10,
          borderRadius: 8,
          alignSelf: 'flex-end',
          marginBottom: 12,
        }}
        onPress={handleSepeteGit}
      >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Sepete Git ({sepet.length})</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Tişörtler</Text>
      <FlatList
        data={tisortler}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f0ff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1464fa', textAlign: 'center', marginVertical: 18 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 15, marginBottom: 16, alignItems: 'center', shadowColor: '#c8d8fa', shadowOpacity: 0.22, shadowRadius: 8, elevation: 2 },
  image: { width: 120, height: 120, borderRadius: 12, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: '700', color: '#444', marginBottom: 3 },
  desc: { fontSize: 13, color: '#868686', marginBottom: 4, fontStyle: 'italic' },
  price: { fontSize: 16, color: '#16803e', fontWeight: 'bold', marginBottom: 8 },
  button: { backgroundColor: '#1464fa', paddingVertical: 10, paddingHorizontal: 28, borderRadius: 10, marginTop: 6 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  bedenRow: { flexDirection: 'row', marginBottom: 8, marginTop: 4 },
  bedenButton: {
    borderColor: '#1464fa',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  bedenButtonSelected: {
    backgroundColor: '#1464fa',
    borderColor: '#1464fa',
  },
});  