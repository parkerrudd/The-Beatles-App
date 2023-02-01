import { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const API_URL = 'https://api.deezer.com/album/';

export default function AlbumData({ route }) {

  useEffect(() => {
    getAlbumInfo();
  }, [])

  const getAlbumInfo = async () => {
    try {
      const result = await fetch(`${API_URL}${route.params.albumId}`)
      const data = await result.json();
      console.log(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView>

    </SafeAreaView>
  )
}