import React, { useState, useEffect } from "react"
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Text,
} from "react-native"
import { openURL } from "expo-linking"
import firebase from "firebase"
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons"
import ImageView from "react-native-image-view"

import AppText from "../components/AppText"
import colors from "../../config/colors"
import ProfileComponent from "../components/ProfileComponent"
import ActivityIndicator from "../components/ActivityIndicator"
import AppButton from "../components/AppButton"
import AppModal from "../components/AppModal"
import DetailSection2 from "../components/specifications/DetailSection2"
import DetailSection from "../components/specifications/DetailSection"
import Screen from "../components/Screen"

import FloatButton from "../components/FloatButton"
import { changeSavedPost, savePost, unsavePost } from "../../redux/actions"
import DetailsText from "../components/DetailsText"
const PostDetail = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  //state---------//
  const [post, setPost] = useState(null)

  const [postUser, setPostUser] = useState()
  const currentUser = firebase.auth().currentUser
  //Main image
  const [image, setImage] = useState()
  //images for the carousel (all the array of images)
  const [carousel, setCarousel] = useState([])
  const [carouselVisible, setCarouselVisible] = useState(false)

  const [bookmarked, setBookmarked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(true)
  //fetch post with postId
  useEffect(() => {
    //when only have the id not the post itself
    if (!("title" in route.params)) fetchPost()
    else {
      setPost(route.params)
      fetchPostUser(route.params.userID)
      setImage(route.params.images[0])
      imagesMap(route.params.images)
      setError(false)
    }
  }, [])
  const fetchPost = () => {
    try {
      setLoading(true)
      firebase
        .firestore()
        .collection("missings")
        .doc(route.params.id)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setPost(snapshot.data())
            setImage(snapshot.data().images[0])
            imagesMap(snapshot.data().images)
            fetchPostUser(snapshot.data().id)
          }
        })
      setLoading(false)
      setError(false)
    } catch (e) {
      console.log(`e`, e)
      setError(true)
      setLoading(false)
    }
  }
  const fetchPostUser = (id) => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setPostUser(snapshot.data())
        }
      })
  }
  //save the post images into state and map them into a formatted array
  //to display the images in imageView(carousel)
  const imagesMap = (arr) => {
    arr = arr.map((uri, index) => ({ source: { uri }, id: index + 1 }))
    setCarousel(arr)
  }

  const onShare = () => {
    navigation.navigate("SharingView", { post })
  }

  //Loading
  if (!post) return <ActivityIndicator visible={loading} />
  //Error
  if (error) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <AppText style2={{ textAlign: "center" }}>
          Erreur lors du chargement du post
        </AppText>
        <AppButton title="Réessayer" onPress={() => setPost(route.params)} />
      </View>
    )
  }
  const contact = (input) => {
    if (input === "email") {
      openURL(`mailto:${post.email}`)
    } else {
      openURL(`tel:${post.tel}`)
    }
  }
  const onBookmark = () => {
    setBookmarked(!bookmarked)
    changeSavedPost(post.id, bookmarked)
  }
  //Success
  if (post) {
    return (
      <Screen>
        {/* Header */}
        <View style2={styles.header}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: colors.light,
              borderRadius: 45,
              bottom: 35,
              flexDirection: "row",
              padding: 8,
              position: "absolute",
              right: 20,
              zIndex: 100,
            }}
          >
            <AppText
              style={{ marginRight: 8, fontSize: 18, color: colors.medium }}
            >
              {carousel.length}
            </AppText>
            <FontAwesome5 name="images" size={18} color={colors.medium} />
          </View>
          {/* Buttons */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              zIndex: 100,
              borderRadius: 12,
              left: 10,
              top: 25,
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left-circle"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onBookmark()}
            style={{
              position: "absolute",
              zIndex: 100,
              borderRadius: 12,
              right: 10,
              top: 25,
            }}
          >
            <MaterialCommunityIcons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>

          {/* Image */}
          <TouchableOpacity
            onPress={() => {
              setCarouselVisible(true)
            }}
          >
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </TouchableOpacity>
          {/* Carousel */}
          <ImageView
            backgroundColor={"white"}
            animationType="slide"
            images={carousel}
            imageIndex={0}
            isVisible={carouselVisible}
            isPinchZoomEnabled={false}
            isTapZoomEnabled={false}
            isSwipeCloseEnabled={true}
            onClose={() => setCarouselVisible(false)}
            renderFooter={(currentImage) => (
              <View
                style={{
                  alignSelf: "center",
                  bottom: 50,
                  backgroundColor: colors.light,
                  borderRadius: 45,
                  width: 60,
                  padding: 8,
                }}
              >
                <AppText
                  style={{
                    alignSelf: "center",
                  }}
                >
                  {`${currentImage.id} / ${carousel.length}`}
                </AppText>
              </View>
            )}
          />
        </View>
        {/* Detail section */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white" }}
        >
          <AppModal
            action={contact}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

          {post.postType == "missings" ? (
            <DetailSection post={post} />
          ) : (
            <DetailSection2 post={post} />
          )}
        </ScrollView>

        {/* Footer : Edit Button or Profil Component */}
        <View
          style={{
            height: 75,
            justifyContent: "center",
          }}
        >
          {post.userID == currentUser.uid ? (
            <AppButton
              title="Modifier"
              onPress={() =>
                navigation.navigate("AccountNavigator", {
                  screen: "PostEdit",
                  params: post,
                })
              }
            />
          ) : (
            postUser && (
              <ProfileComponent
                image={postUser.image}
                title={postUser.name}
                buttonTitle="Contacter"
                buttonAction={() => setModalVisible(true)}
                style2={styles.profileComponent}
              />
            )
          )}
        </View>
        {/* Share Button Floating */}
        <FloatButton
          onPress={onShare}
          icon={"share-variant"}
          color={colors.primary}
        />
      </Screen>
    )
  }
}

export default PostDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  header: {
    width: "100%",
    borderColor: "black",
  },
  profileComponent: {
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    backgroundColor: colors.light,
  },
})
