import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, Dimensions, Image, View, SafeAreaView, FlatList, TextInputComponent } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const API_URL = 'https://api.deezer.com/artist/1/albums?limit=50';
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function App() {
  const [deezerData, setDeezerData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) getDeezerData();
  }, [isLoaded])

  const getDeezerData = async () => {
    try {
      const result = await fetch(API_URL);
      const data = await result.json();
      setDeezerData(data?.data);
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoaded(true);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => console.log('pressed')}>
        <View style={styles.listItem}>
          <Image
            style={styles.images}
            source={{ uri: item.cover_big }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"  />
      { !isLoaded ? (
        <AnimatedLottieView
          source={require('./assets/99833-edupia-loading.json')}
          autoPlay
        />
      ) : (
      <View>
        <Text style={styles.text}>The Beatles</Text>
        <FlatList
          style={styles.list}
          data={deezerData}
          renderItem={renderItem}
          numColumns={3}
        />
      </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#243E72',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: screenWidth
  },
  list: {
    marginTop: 10
  },
  listItem: {
    margin: 5,
    shadowOpacity: 0.3
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  images: {
    width: screenWidth / 3.3,
    height: screenWidth / 3.3
  }
});
