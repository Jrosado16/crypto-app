import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, StatusBar, TextInput } from 'react-native'
import CoinItem from './components/CoinItem';

const App = () => {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const resp = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    const data = await resp.json();
    setCoins(data);
  }

  useEffect(() => {
    loadData();
  },[]);

  return (
    <View style={style.container}>
      <StatusBar backgroundColor='#141414' />
      <View style={style.header}>
        <Text style={style.title}>CrytoMarket</Text>
        <TextInput style={style.searchInput}
          placeholder='Search a Coin'
          placeholderTextColor='#858585'
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList
        style={style.list}
        data={coins.filter((coin) => 
          coin.name.toLowerCase().includes(search) ||  
          coin.symbol.toLowerCase().includes(search)   
        )}
        renderItem={({item}) => {
          return <CoinItem coin={item} />
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async() => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    color: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
  },
  list: {
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center',
  }
})

export default App