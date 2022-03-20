import React, { useState, useEffect, useRef } from "react"
import { View, Text, Image, StyleSheet, Share, Platform } from "react-native"
import { captureRef } from "react-native-view-shot"
import * as Permissions from "expo-permissions"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import colors from "../../config/colors"
import AppButton from "../components/AppButton"
import DetailsText2 from "../components/DetailsText2"
import Screen from "../components/Screen"
import IconButton from "../components/IconButton"
import SharingMissings from "../components/specifications/SharingMissings"
import SharingAnimals from "../components/specifications/SharingAnimals"
import SharingStudents from "../components/specifications/SharingStudents"
import SharingObjects from "../components/specifications/SharingObjects"

//listen for links

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
  // const handleSave = async () => {
  //   const image = await captureViewToImage()
  //   const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
  //   if (status == "granted") {
  //     // const asset = await MediaLibrary.createAssetAsync(image)
  //     MediaLibrary.createAlbumAsync("Wanted", image)
  //   } else {
  //     console.log(`oh`)
  //   }
  // }

  const getUrlFromFirebase = async (id) => {
    try {
      const response = await fetch(
        "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCeoQjaosVPYf8xS0QxiqIOL_od4exQf8s",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: {
            dynamicLinkInfo: {
              domainUriPrefix: "https://wantedapp3.page.link",
              link: `https://abdedev.fr/posts/${id}`,
              androidInfo: {
                androidPackageName: "com.wantedapp",
              },
              iosInfo: {
                iosBundleId: "com.wantedapp",
              },
            },
          },
        }
      )
      const json = await response.json()
      return json.shortLink
    } catch (error) {
      console.error(error)
    }
  }
  // const handleShare = async () => {
  //   const image = await captureViewToImage()
  //   if (!(await Sharing.isAvailableAsync())) {
  //     alert(`Uh oh, sharing isn't available on your platform`)
  //     return
  //   }

  //   await Sharing.shareAsync(getUrlFromFirebase(post.id))
  // }

  const onShare = async () => {
    const image = await captureViewToImage()
    const link = await getUrlFromFirebase(post.id)
    const options = {
      url: image,
      message: link,
    }
    try {
      if (post.id) {
        const result = await Share.share(options)

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      }
    } catch (error) {
      alert(error.message)
    }
  }
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
            {post.postType === "missings" ? (
              <SharingMissings post={post} />
            ) : post.postType === "students" ? (
              <SharingStudents post={post} />
            ) : post.postType === "animals" ? (
              <SharingAnimals post={post} />
            ):<SharingObjects post={post}/>}
          </View>
          <View
            style={{
              //borderWidth: 1,
              borderColor: "green",
              width: "100%",
            }}
          >
            {post.email && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton name={"email"} size={20} color={colors.medium} />
                <DetailsText2 text={post.email} />
              </View>
            )}
            {post.tel && (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <IconButton name={"phone"} size={20} color={colors.medium} />
                <DetailsText2 text={post.tel} />
              </View>
            )}
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
            justifyContent: "space-around",
          }}
        >
          {/* <AppButton
            title="Télécharger"
            onPress={handleSave}
            width={"50%"}
            color="white"
            text="primary"
          /> */}
          <AppButton title="Partager" onPress={onShare} width={"45%"} />
        </View>
      </View>
    </Screen>
  )
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
    fontSize: 20,
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
