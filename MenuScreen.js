import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const menuData = [
  { id: '1', name: 'Burger', description: 'Spicy Chicken burger', price: 'Rs.600', image: require('./assets/burger.png') },
  { id: '2', name: 'Pizza', description: 'Cheesy Mushroom pizza', price: 'Rs.1560', image: require('./assets/pizza.png') },
  { id: '3', name: 'French Fries', description: 'Potato fries', price: 'Rs.350', image: require('./assets/fries.png')},
  { id: '4', name: 'Chicken Wings', description: 'Hot Chicken Wings', price: 'Rs.800', image: require('./assets/chickenwings.png')},
  { id: '5', name: 'Menu deal', description: 'Chicken Burger with large fries & a drink', price: 'Rs.1000', image: require('./assets/deal.png')},
  { id: '6', name: 'Drinks', description: 'Coke,Fanta,Sprite & 7up', price: 'Rs.150', image: require('./assets/drinks.png')},
];

const MenuScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const imageHeight = screenWidth * 0.4
  ;

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null; 
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <ImageBackground source={item.image} style={[styles.imageBackground, { height: imageHeight }]}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Explore Our Delicious Menu</Text>
        <FlatList
          data={menuData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
   
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Inter_900Black',
  },
  item: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  imageBackground: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  itemInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Inter_900Black',
  },
  itemDescription: {
    color: 'white',
    marginBottom: 5,
  
  },
  itemPrice: {
    color: 'white',
    fontWeight: 'normal',
  },
});

export default MenuScreen;
