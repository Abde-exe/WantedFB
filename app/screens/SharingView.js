import React, { useState, useEffect, useRef } from "react"
import { View, Text, Image, StyleSheet, Button } from "react-native"
import { captureRef } from "react-native-view-shot"

import * as Permissions from "expo-permissions"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"

const SharingView = ({ route }) => {
  const viewRef = useRef()
  const [post, setpost] = useState(route.params)
  useEffect(() => {
    setpost(route.params)
  }, [route.params])

  const captureViewToImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 0.7,
      })
      return uri
    } catch (error) {
      console.log(error)
    }
  }
  const handleSave = async () => {
    const image = await captureViewToImage()
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
    if (status == "granted") {
      const assert = await MediaLibrary.createAssetAsync(image)
      MediaLibrary.createAlbumAsync("Tutorial", assert)
    } else {
      console.log(`oh`)
    }
  }

  const handleShare = async () => {
    const image = await captureViewToImage()
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`)
      return
    }

    await Sharing.shareAsync(image)
  }

  if (post) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container} ref={viewRef}>
          <Text>Disparition</Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: "yellow",
              flexDirection: "row",
              height: "40%",
            }}
          >
            <Image
              source={{
                uri:
                  "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg):focal(1238x372:1240x370)/origin-imgresizer.eurosport.com/2021/08/20/3204106-65637388-2560-1440.jpg",
              }}
              style={{ width: "50%", resizeMode: "cover" }}
            />

            <View
              style={{
                borderWidth: 1,
                borderColor: "red",
                width: "50%",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text>Identité</Text>
              <Text>Name</Text>
              <Text>Age</Text>
              <Text>Disparu(e) le 00/00 à Amsterdam</Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "blue",
              width: "100%",
              height: "30%",
            }}
          >
            <Text>Description Physique</Text>
            <Text>Corpulence</Text>
            <Text>Taille</Text>
            <Text>Cheveux</Text>
            <Text>Yeux</Text>
            <Text>Tenue Vestimentaire</Text>
            <Text>Signe Particulier, Autre</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "green",
              width: "100%",
            }}
          >
            <Text>Contact</Text>
            <Text>Email</Text>
            <Text>Telephone</Text>
            <Text>Facebook</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button title="Télécharger" onPress={handleSave} />
          <Button title="Partager" onPress={handleShare} />
        </View>
      </View>
    )
  } else {
    return <View></View>
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderWidth: 1,
    padding: 8,
    margin: 8,
  },
})

export default SharingView
