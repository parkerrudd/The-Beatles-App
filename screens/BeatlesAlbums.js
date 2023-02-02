import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Platform, TouchableOpacity, Dimensions, Image, View, SafeAreaView, FlatList, Alert } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { useQuery } from 'react-query';

const screenWidth = Dimensions.get('screen').width;

export default function BeatlesAlbums({ navigation }) {
  const { isLoading, error, data } = useQuery('deezerData', async () => {
    const res = await fetch('https://api.deezer.com/artist/1/albums?limit=50');
    const jsonData = res.json();
    return jsonData;
  })

  if (error) {
    Alert.alert('Albums are unable to load. ' + error.message);
    console.error(error);
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
            source={{ uri: item.cover_big }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  if (isLoading) {
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
        data={data?.data}
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
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center'
  },
  images: {
    width: screenWidth / 3.3,
    height: screenWidth / 3.3
  }
});
