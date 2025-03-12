import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Image , Modal, TouchableWithoutFeedback} from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/native';



const OrderScreen = () => {
  const [selectedItems, setSelectedItems] = useState([
    { id: 'Order1', name: 'Burger', price: 600, image: require('./assets/burger.png'), quantity: 0 },
    { id: 'Order2', name: 'Pizza', price: 1560, image: require('./assets/pizza.png'), quantity: 0 },
    { id: 'Order3', name: 'Fries', price: 350, image: require('./assets/fries.png'), quantity: 0 },
    { id: 'Order4', name: 'Chicken Wings', price: 800, image: require('./assets/chickenwings.png'), quantity: 0 },
    { id: 'Order5', name: 'Menu Deal', price: 1000, image: require('./assets/deal.png'), quantity: 0 },
    { id: 'Order6', name: 'Drinks', price: 150, image: require('./assets/drinks.png'), quantity: 0 },
  ]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const updateQuantity = (itemId, action) => {
    setSelectedItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: action === 'increment' ? item.quantity + 1 : item.quantity - 1 }
          : item
      )
    );
  };

  const cancelOrder = () => {
    navigation.navigate('Home');
  };

  const confirmOrder = () => {
    setOrderConfirmed(true);
    setModalVisible(true);
  };

  const totalAmount = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{`Rs.${item.price.toFixed(2)}`}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, 'decrement')}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, 'increment')}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        {orderConfirmed ? (
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalConfirmationText}>HERE IS YOUR ORDER </Text>
               
                {selectedItems.map(item => {
                      if (item.quantity > 0) {
                      return (
                     <View key={item.id} style={styles.modalSelectedItem}>
                     <Text style={styles.modalSelectedItemName}>{item.name}</Text>
                     <Text style={styles.modalSelectedItemQuantity}>Qty: {item.quantity}</Text>
                    </View>
                     );
                 } else {
                  return null;
                   }
                  })}
                <Text style={styles.modalTotalAmount}>Total: Rs.{totalAmount.toFixed(2)}</Text>
                <Text style={styles.gestureText}> Your Order Will Arrive On Your Seat Soon! </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        ) : (
          <React.Fragment>
            <Text style={styles.orderTitle}>Place Your Order</Text>
            <View style={styles.orderingMenu}>
              {selectedItems.length > 0 ? (
                <FlatList
                  data={selectedItems}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
              ) : (
                <View style={styles.emptyContainer}>
                  <Image source={require('./assets/payment.png')} style={styles.emptyImage} />
                  <Text style={styles.emptyText}>Your order is empty</Text>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add Items</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.bottomButtons}>
              <TouchableOpacity style={styles.button} onPress={cancelOrder}>
                <Text style={styles.buttonText}>Cancel Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={confirmOrder}>
                <Text style={styles.buttonText}>Confirm Order</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        )}
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
    justifyContent: 'space-between',
  },
  orderTitle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Inter_900Black',
    marginBottom: 18,
  },
  orderingMenu: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  itemImage: {
    width: 120,
    height: 83,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Inter_900Black',
  },
  itemPrice: {
    color: 'white',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#FF6347',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 20,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Inter_900Black',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Inter_900Black',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FF6347',
    padding: 20,
    borderRadius: 10,
    width: '75%',
  },
  modalConfirmationText: {
    fontSize: 20,
    
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Inter_900Black',
  },
  modalTotalAmount: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    
    fontFamily: 'Inter_900Black',
  },
  modalSelectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    fontWeight:'bold',
  },
  modalSelectedItemName: {
    fontSize: 15,
    marginRight: 5,
    fontFamily: 'Inter_900Black',
    fontWeight:'bold',
  },
  modalSelectedItemQuantity: {
    fontSize: 15,
    fontFamily: 'Inter_900Black',
    fontWeight:'bold',
  },

  gestureText:{
    marginTop:30,
    textAlign:'center',
    fontSize: 15,
    fontWeight:'bold',
    fontFamily: 'Inter_900Black',
  }
});

export default OrderScreen;
