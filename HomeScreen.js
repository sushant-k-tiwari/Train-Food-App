import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
const HomeScreen = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        Inter_900Black,
      });
    
      if (!fontsLoaded) {
        return null; 
      }

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome to RailFoods App!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.buttonText}>View Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Order')}
        >
          <Text style={styles.buttonText}>Your Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Wallet')}
        >
          <Text style={styles.buttonText}>Your Wallet</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    
    alignItems: 'center',
    
  },
  logo: {
    width:120,
    height:100,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 45,
  
    marginBottom: 40,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Inter_900Black',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Inter_900Black',
  },
});

export default HomeScreen;
