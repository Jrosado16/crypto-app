import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import React from 'react'

const CoinItem = ({ coin }) => {
  return (
    <View style={style.item}>
      <View style={style.coinNames}>
        <Image style={style.image} source={{uri: coin.image }} />
        <View style={style.containerNames}>
          <Text style={style.text}>{coin.name}</Text>
          <Text style={style.textSymbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={style.pricePercentage}>${coin.current_price}</Text>
        <Text style={[
          style.pricePercentage,
          coin.price_change_percentage_24h > 0
            ? style.priceUp
            : style.priceDown
          ]}>
          ${coin.price_change_percentage_24h}
        </Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  item: {
    backgroundColor: '#121212',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerNames: {
    marginLeft: 10,
  },
  coinNames: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  textSymbol: {
    color: '#434343',
    textTransform: 'uppercase',
  },
  text: {
    color: '#fff',
  },
  pricePercentage: {
    color: '#fff',
    textAlign: 'right',
  },
  priceUp: {
    color: '#00B5B9',
  },
  priceDown: {
    color: '#fc4422',
  }
});

export default CoinItem;