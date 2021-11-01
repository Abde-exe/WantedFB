import React, { useState, useEffect, useRef } from "react"
import { View, Text, Image, StyleSheet, Button } from "react-native"
import { captureRef } from "react-native-view-shot"

import * as Permissions from "expo-permissions"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import "moment/locale/fr"
import moment from "moment"
moment.locale("fr")

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
    const {
      images,
      name,
      age,
      date,
      location,
      corpulence,
      height,
      hair,
      eyes,
      outfit,
      other,
      tel,
      email,
    } = post
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
            {images && (
              <Image
                source={{
                  uri: post.images[0],
                }}
                style={{ width: "50%", resizeMode: "cover" }}
              />
            )}

            <View
              style={{
                borderWidth: 1,
                borderColor: "red",
                width: "50%",
                height: "100%",
              }}
            >
              <Text>Identité</Text>
              {name != "" ? <Text>Nom : {name}</Text> : null}
              {age != "" ? <Text>Age : {age} ans</Text> : null}
              <View style={{ flexDirection: "row" }}>
                <Text>Recherché(e) depuis</Text>
                {date != "" ? (
                  <Text> le {moment(date.toDate()).format("L")}</Text>
                ) : null}
                {location != "" ? <Text> à {location}</Text> : null}
              </View>
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
            {corpulence != "" ? <Text>Corpulence : {corpulence}</Text> : null}
            {height != "" ? <Text>Taille : {height} cm</Text> : null}
            {hair != "" ? <Text>Cheveux : {hair}</Text> : null}
            {eyes != "" ? <Text>Yeux : {eyes}</Text> : null}
            {outfit != "" ? <Text>Tenue Vestimentaire : {outfit}</Text> : null}
            {other != "" ? (
              <Text>Signe Particulier, Autre : {other}</Text>
            ) : null}
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "green",
              width: "100%",
            }}
          >
            <Text>Contact</Text>
            {email != "" ? <Text>Email : {email}</Text> : null}
            {tel != "" ? <Text>Telephone : {tel}</Text> : null}
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
