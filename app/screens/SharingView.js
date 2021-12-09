import React, { useState, useEffect, useRef } from "react"
import { View, Text, Image, StyleSheet, Button } from "react-native"
import { captureRef } from "react-native-view-shot"

import * as Permissions from "expo-permissions"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import dayjs from "dayjs"
import colors from "../../config/colors"
import AppButton from "../components/AppButton"

const SharingView = ({ route }) => {
  const viewRef = useRef()
  const [post, setpost] = useState(route.params.post)

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
      <View
        style={{
          flex: 1,
          paddingHorizontal: 8,
          paddingBottom: 50,
          backgroundColor: colors.light,
        }}
      >
        <View style={styles.container} ref={viewRef}>
          <View
            style={{ flexDirection: "row", width: "100%", flexWrap: "wrap" }}
          >
            {date && (
              <Text style={styles.title}>
                {`Disparu(e) depuis le ${dayjs(date.toDate()).format("D/M")}`}
              </Text>
            )}
            {location && (
              <Text style={styles.title}>{` à ${location.split(",")[0]}`}</Text>
            )}
          </View>
          <View
            style={{
              //borderWidth: 2,
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
                //borderWidth: 1,
                borderColor: "red",
                width: "50%",
                height: "100%",
              }}
            >
              {name != "" ? <Text style={styles.text}>{name}</Text> : null}
              {age != "" ? (
                <Text style={styles.subText}>Age : {age} ans</Text>
              ) : null}
            </View>
          </View>
          <View
            style={{
              //borderWidth: 1,
              borderColor: "blue",
              width: "100%",
              height: "40%",
            }}
          >
            {corpulence != "" ? (
              <Text style={styles.subText}>Corpulence : {corpulence}</Text>
            ) : null}
            {height != "" ? (
              <Text style={styles.subText}>Taille : {height} cm</Text>
            ) : null}
            {hair != "" ? (
              <Text style={styles.subText}>Cheveux : {hair}</Text>
            ) : null}
            {eyes != "" ? (
              <Text style={styles.subText}>Yeux : {eyes}</Text>
            ) : null}
            {outfit != "" ? (
              <Text style={styles.subText}>Tenue Vestimentaire : {outfit}</Text>
            ) : null}
            {other != "" ? (
              <Text style={styles.subText}>Signe Particulier : {other}</Text>
            ) : null}
          </View>
          <View
            style={{
              //borderWidth: 1,
              borderColor: "green",
              width: "100%",
            }}
          >
            <Text>Contact</Text>
            {email != "" ? <Text>Email : {email}</Text> : null}
            {tel != "" ? <Text>Téléphone : {tel}</Text> : null}
            <Text>Facebook</Text>
          </View>
          <View
            style={{
              position: "absolute",
              zIndex: 100,
              bottom: 0,
              right: 0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/icon.png")}
              style={{ height: 50, width: 50 }}
            />
            <Text
              style={{
                color: colors.secondary,
                flexWrap: "wrap",
                width: 80,
                fontSize: 12,
              }}
            >
              Edité avec l'appli Wanted
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 8,
            alignSelf: "center",
            width: "100%",
          }}
        >
          <AppButton
            title="Télécharger"
            onPress={handleSave}
            width={"53%"}
            color="white"
            text="primary"
          />
          <AppButton title="Partager" onPress={handleShare} width={"47%"} />
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
    //borderWidth: 1,
    padding: 8,
    margin: 8,
    justifyContent: "space-between",
  },
  title: { fontSize: 24, color: colors.danger },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 4,
  },
  subText: {
    fontSize: 18,
    marginLeft: 4,
    marginTop: 4,
  },
})

export default SharingView
