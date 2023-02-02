import * as React from 'react';
import { SafeAreaView, Text, View, TouchableWithoutFeedback, Platform, Dimensions, Image, StyleSheet, FlatList, Alert } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";

const screenWidth = Dimensions.get('screen').width;

export default function AlbumData({ route, navigation }) {
  const { isLoading, error, data } = useQuery(`albumData-${route.params.albumId}`, async () => {
    const res = await fetch(`https://api.deezer.com/album/${route.params.albumId}`);
    const jsonData = await res.json();
    return jsonData;
  });

  if (error) {
    Alert.alert('Album data is unable load. ' + error.message);
    console.error(error);
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
        source={{ uri: data?.cover_big }}
      />
      <Text style={styles.text}>{data?.artist?.name}</Text>
      <Text style={styles.text}>{data?.title} ({data?.release_date.slice(0, 4)})</Text>
      <FlatList
        data={data?.tracks?.data}
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
