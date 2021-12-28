import React, { useState, useEffect, useRef } from "react"
import { View, Text, Image, StyleSheet, Share, Platform } from "react-native"
import { captureRef } from "react-native-view-shot"
import * as Permissions from "expo-permissions"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import * as RNFS from "expo-file-system"

import dayjs from "dayjs"
import colors from "../../config/colors"
import AppButton from "../components/AppButton"
import DetailsText2 from "../components/DetailsText2"
import Screen from "../components/Screen"
import IconButton from "../components/IconButton"

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
      const asset = await MediaLibrary.createAssetAsync(image)
      console.log(`asset`, asset)
      MediaLibrary.createAlbumAsync("Wanted", asset)
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
  const onShare = async () => {
    const image = await captureViewToImage()

    try {
      const result = await Share.share({
        url: image,
        message: "https://twitter.com/exclusiveraniou?s=20",
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

  if (post) {
    const {
      images,
      title,
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
    var date2 = ""
    date.seconds ? (date2 = date.toDate()) : (date2 = date)
    return (
      <Screen>
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
              {date2 && (
                <Text style={styles.title}>
                  {`Disparu(e) depuis le ${dayjs(date2).format("D/M")}`}
                </Text>
              )}
              {location != "" ? (
                <Text style={styles.title}>{`à ${
                  location.name.split(",")[0]
                }`}</Text>
              ) : null}
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
                  style={{
                    width: "100%",
                    resizeMode: "cover",
                    borderWidth: 2,
                    borderColor: colors.danger,
                  }}
                />
              )}

              <View
                style={{
                  //borderWidth: 1,
                  borderColor: "red",
                  width: "50%",
                  height: "100%",
                }}
              ></View>
            </View>
            <View
              style={{
                //borderWidth: 1,
                borderColor: "blue",
                width: "100%",
                height: "40%",
              }}
            >
              {title != "" ? <Text style={styles.text}>{title}</Text> : null}
              {age != "" ? (
                <DetailsText2 row text={age} subText="Age :" other="ans" />
              ) : null}
              {corpulence != "" ? (
                <DetailsText2 row text={corpulence} subText="Corpulence :" />
              ) : null}
              {height != "" ? (
                <DetailsText2 row text={height} subText="Taille :" other="cm" />
              ) : null}
              {hair != "" ? (
                <DetailsText2 row text={hair} subText="Cheveux :" />
              ) : null}
              {eyes != "" ? (
                <DetailsText2 row text={eyes} subText="Yeux :" />
              ) : null}
              {outfit != "" ? (
                <DetailsText2
                  row
                  text={outfit}
                  subText="Tenue Vestimentaire :"
                />
              ) : null}
              {other != "" ? (
                <DetailsText2 row text={other} subText="Signe Particulier :" />
              ) : null}
            </View>
            <View
              style={{
                //borderWidth: 1,
                borderColor: "green",
                width: "100%",
              }}
            >
              {email != "" ? (
                <DetailsText2 row text={email} subText="Email :" />
              ) : null}
              {tel != "" ? (
                <DetailsText2 row text={tel} subText="Téléphone :" />
              ) : null}
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
                style={{ height: 30, width: 30 }}
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
              bottom: 12,
              zIndex: 100,
              alignSelf: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {/* <AppButton
            title="Télécharger"
            onPress={handleSave}
            width={"53%"}
            color="white"
            text="primary"
          /> */}
            <AppButton
              title="Partager"
              onPress={Platform.OS == "ios" ? onShare : onShare}
              width={"47%"}
            />
          </View>
        </View>
      </Screen>
    )
  } else {
    return (
      <View>
        <Text>test</Text>
      </View>
    )
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
  title: {
    fontSize: 22,
    color: colors.danger,
    paddingHorizontal: 8,
  },
  text: {
    textAlign: "center",
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
