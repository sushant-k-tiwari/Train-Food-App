import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
const WalletScreen = () => {
    let [fontsLoaded] = useFonts({
        Inter_900Black,
      });
    
      if (!fontsLoaded) {
        return null; 
      }
  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('./assets/payment.png')} style={styles.walletImage} />
        <Text style={styles.balanceText}>Your Wallet Balance:</Text>
        <Text style={styles.balanceAmount}>Rs.0</Text>
    
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
    fontFamily: 'Inter_900Black',
  },
  balanceAmount: {
    fontSize: 36,
    
    color: 'white',
  },
});

export default WalletScreen;
