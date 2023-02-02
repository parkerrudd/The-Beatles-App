import { useState, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableWithoutFeedback, Platform, Dimensions, Image, StyleSheet, FlatList, Alert } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get('screen').width;

export default function AlbumData({ route, navigation }) {
  const [albumInfo, setAlbumInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) getAlbumInfo();
  }, [isLoading])

  const getAlbumInfo = async () => {
    try {
      const result = await fetch(`https://api.deezer.com/album/${route.params.albumId}`);
      const data = await result.json();
      setAlbumInfo(data);
    }
    catch (error) {
      Alert.alert('Album data could not be loaded. ' + error.message);
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.tracks}>
        <Text style={styles.trackNumber}>{index + 1}</Text>
        <Text style={styles.trackText}>{item.title_short}</Text>
      </View>
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
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Ionicons
          style={styles.backArrow}
          name="arrow-back"
          size={30}
        />
      </TouchableWithoutFeedback>
      <Image
        style={styles.artwork}
        source={{ uri: albumInfo?.cover_big }}
      />
      <Text style={styles.text}>{albumInfo?.artist?.name}</Text>
      <Text style={styles.text}>{albumInfo?.title} ({albumInfo?.release_date.slice(0, 4)})</Text>
      <FlatList
        data={albumInfo?.tracks?.data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#243E72',
    paddingTop: Platform.OS === 'android' ? 35 : 0
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 20,
    color: '#fff'
  },
  artwork: {
    width: screenWidth / 2,
    height: screenWidth / 2
  },
  text: {
    fontSize: 20,
    color: '#fff',
    padding: 8,
    fontWeight: '600',
    textAlign: 'center'
  },
  tracks: {
    flex: 1,
    flexDirection: 'row',
    color: '#fff',
    fontSize: 15,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: screenWidth - 20
  },
  trackText: {
    flex: 5,
    fontSize: 15,
    fontWeight: '500',
    color: '#fff'
  },
  trackNumber: {
    flex: 1,
    fontSize: 15,
    color: '#fff'
  }
})
