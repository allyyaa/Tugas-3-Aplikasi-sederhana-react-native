import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, ScrollView, FlatList, TouchableOpacity, Alert} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; 

// Data barang
const data = [
  {
    id: '1',
    image: 'https://i.pinimg.com/564x/a2/01/d8/a201d88f45f3ae193b87cfa91865b283.jpg',
    title: 'Sepatu A',
    price: 'Rp1.000.000',
  },
  {
    id: '2',
    image: 'https://i.pinimg.com/564x/ea/56/7b/ea567b32db0e61fbcfa881c4cf41e610.jpg',
    title: 'Sneakers b',
    price: 'Rp2.500.000',
  },
  {
    id: '3',
    image: 'https://i.pinimg.com/564x/97/c2/c4/97c2c4d1035d52eacf565ba3e27275e0.jpg',
    title: 'Sepatu Boots A',
    price: 'Rp300.000',
  },
  {
    id: '4',
    image: 'https://i.pinimg.com/564x/2a/51/ae/2a51aec0cd2c6bfde875224d6c9ac689.jpg',
    title: 'Sepatu Boots B',
    price: 'Rp4.600.000',
  },
  {
    id: '5',
    image: 'https://i.pinimg.com/564x/27/4a/b6/274ab674fad882f3b56ad3b7a51e3596.jpg',
    title: 'Crop Top A',
    price: 'Rp500.000',
  },
  {
    id: '6',
    image: 'https://i.pinimg.com/564x/f7/6d/c6/f76dc67a545969a1be8414121b1d1897.jpg',
    title: 'Crop Top B',
    price: 'Rp200.000',
  },
  {
    id: '7',
    image: 'https://i.pinimg.com/564x/62/c9/19/62c9192aaa38653b10adf9d73aa20b27.jpg',
    title: 'Rok A',
    price: 'Rp800.000',
  },
  {
    id: '8',
    image: 'https://i.pinimg.com/736x/1a/24/40/1a2440a0d69a70f0666554cca9606d76.jpg',
    title: 'Rok B',
    price: 'Rp900.000',
  },
  {
    id: '9',
    image: 'https://i.pinimg.com/736x/a4/93/72/a4937244685dde2fee0ce3b0f5e24b6a.jpg',
    title: 'Kalung A',
    price: 'Rp150.000',
  },
  {
    id: '10',
    image: 'https://i.pinimg.com/564x/b6/ad/37/b6ad371c4b79782556e394efbbf9b13b.jpg',
    title: 'Kalung B',
    price: 'Rp300.000',
  },
  {
    id: '11',
    image: 'https://i.pinimg.com/736x/24/88/16/248816f0490b96ecc56e3ccb50adac1b.jpg',
    title: 'Anting A',
    price: 'Rp200.000',
  },
  {
    id: '12',
    image: 'https://i.pinimg.com/564x/81/c8/2d/81c82d4a66defe02a8dcec68f0148435.jpg',
    title: 'Anting B',
    price: 'Rp320.000',
  },
  {
    id: '13',
    image: 'https://i.pinimg.com/564x/85/b3/59/85b35946235d960efb13ad23cb0ece8b.jpg',
    title: 'Gelang A',
    price: 'Rp400.000',
  },
  {
    id: '14',
    image: 'https://i.pinimg.com/736x/f1/cc/17/f1cc17c389c51717443c05850ddd166b.jpg',
    title: 'Gelang B',
   
price: 'Rp700.000',
  },
  {
    id: '15',
    image: 'https://i.pinimg.com/564x/dd/c8/5c/ddc85c37a6ff77cac0a0e311c70ff28b.jpg',
    title: 'Cincin couple A',
    price: 'Rp16.000.000',
  },
  {
    id: '16',
    image: 'https://i.pinimg.com/564x/83/97/8c/83978c1f287660d09f0ef970bd8618ea.jpg',
    title: 'Cincin couple B',
    price: 'Rp19.000.000',
  },
];

// Komponen Item
const Item = ({ item, onAddToCart, onLike, liked }) => {
  // State untuk menentukan apakah item disukai
  const [isLiked, setIsLiked] = useState(liked);

  // Handle fungsi Like
  const handleLike = () => {
    onLike(item);
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <TouchableOpacity style={styles.loveIcon} onPress={handleLike}>
        <MaterialIcons name={isLiked ? "favorite" : "favorite-border"} size={24} color={isLiked ? "red" : "black"} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          <TouchableOpacity onPress={() => onAddToCart(item)}>
            <MaterialIcons name="add-shopping-cart" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Komponen utama
const App = () => {
  // State untuk input pencarian
  const [searchQuery, setSearchQuery] = useState('');
  // State untuk data barang yang telah difilter
  const [filteredData, setFilteredData] = useState(data);
  // State untuk menyimpan item yang disukai
  const [likedItems, setLikedItems] = useState([]);
  // State untuk menyimpan item yang telah ditambahkan ke keranjang belanja
  const [cartItems, setCartItems] = useState([]);
  // State untuk menyimpan komentar
  const [comment, setComment] = useState('');
  
  // Fungsi untuk mengubah input pencarian
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    // Mengubah data barang yang ditampilkan sesuai dengan input pencarian
    const newData = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(newData);
  };

  // Fungsi untuk menambah item ke keranjang belanja
  const onAddToCart = (item) => {
    if (cartItems.includes(item.id)) {
      return;
    } else {
      setCartItems([...cartItems, item.id]);
    }
  };

  // Fungsi untuk menambah atau menghapus item dari daftar yang disukai
  const onLike = (item) => {
    if (likedItems.includes(item.id)) {
      setLikedItems(likedItems.filter((itemId) => itemId !== item.id));
    } else {
      setLikedItems([...likedItems, item.id]);
    }
  };

  // Fungsi untuk mengirim komentar
  const sendComment = () => {
    if (comment.trim() !== '') {
      Alert.alert('Success', 'Detail pesanan anda telah terkirim.');
      // Reset input komentar setelah mengirim
      setComment('');
    } else {
      Alert.alert('Error', 'Please kirim detail pesanan kembali.');
    }
  };

  // Menghitung jumlah item dalam keranjang belanja
  const cartItemCount = cartItems.length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon}>
          <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>BELONJO</Text>
        <TouchableOpacity style={styles.userIcon}>
          <MaterialIcons name="person" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Searchbar */}
      <Searchbar
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={onChangeSearch}
        style={styles.searchBar}
      />
      {/* Daftar barang */}
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <Item
            item={item}
            onAddToCart={onAddToCart}
            onLike={onLike}
            liked={likedItems.includes(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View
style={styles.separator} />}
      />
      {/* Icon keranjang */}
      <TouchableOpacity style={styles.cartIcon}>
        <MaterialIcons name="shopping-cart" size={24} color="black" />
        {cartItemCount > 0 && <Text style={styles.cartItemCount}>{cartItemCount}</Text>}
      </TouchableOpacity>
      {/* Input komentar */}
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.inputComment}
          placeholder="Detail Pesanan "
          value={comment}
          onChangeText={setComment}
        />
        <Button title="Kirim" onPress={sendComment} />
      </View>
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1, 
    textAlign: 'center', 
  },
  menuIcon: {
    marginRight: 10,
  },
  userIcon: {
    marginLeft: 'auto',
  },
  searchBar: {
    borderRadius: 10,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  loveIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  infoContainer: {},
  itemTitle: { 
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: '#999',
    fontSize: 16,
  },
  separator: {
    height: 10,
  },
  cartIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 5,
    borderRadius: 50,
    fontSize: 12,
  },
  commentContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  inputComment: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
