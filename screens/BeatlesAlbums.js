import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Platform, TouchableOpacity, Dimensions, Image, View, SafeAreaView, FlatList, Alert } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const screenWidth = Dimensions.get('screen').width;

export default function BeatlesAlbums({ navigation }) {
  const [deezerData, setDeezerData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) getDeezerData();
  }, [isLoaded])

  const getDeezerData = async () => {
    try {
      const result = await fetch('https://api.deezer.com/artist/1/albums?limit=50');
      const data = await result.json();
      setDeezerData(data?.data);
      setIsLoaded(true);
    }
    catch (error) {
      Alert.alert('Album data could not be loaded. ' + error.message);
      console.error(error);
    }
  }

  const handleAlbumPress = (albumId) => {
    navigation.navigate('Album Data', {
      albumId
    });
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleAlbumPress(item.id)}>
        <View style={styles.listItem}>
          <Image
            style={styles.images}
            source={{ uri: item?.cover_big }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <AnimatedLottieView
          source={require('../assets/loading-spinner.json')}
          autoPlay
        />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"  />
      <Text style={styles.text}>The Beatles</Text>
      <FlatList
        style={styles.list}
        data={deezerData}
        renderItem={renderItem}
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#243E72',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: screenWidth,
    paddingTop: Platform.OS === 'android' ? 35 : 0
  },
  list: {
    marginTop: 10
  },
  listItem: {
    margin: 5,
    shadowOpacity: 0.2
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
