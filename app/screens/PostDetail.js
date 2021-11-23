import React, { useState, useEffect } from "react"
import {
  Image,
  StyleSheet,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native"
import * as Linking from "expo-linking"
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

const PostDetail = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)

  //state---------//
  const [post, setPost] = useState(route.params.item)
  const [postUser, setPostUser] = useState(null)
  const currentUser = firebase.auth().currentUser
  //Main image
  const [image, setImage] = useState()
  //images for the carousel (all the array of images)
  const [carousel, setCarousel] = useState([])
  const [carouselVisible, setCarouselVisible] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(true)
  //fetch post with postId
  useEffect(() => {
    fetchPost()
    fetchPostUser()
    //Fetching the images and make them an url if their just a key
    setCarousel([])
    if (post && post.images) {
      setImage(post.images[0])
      imagesMap(post.images)
    }
  }, [])

  const fetchPost = () => {
    try {
      setLoading(true)
      //when only have the id not the post itself
      if (!("item" in route.params)) {
        firebase
          .firestore()
          .collection("missings")
          .doc(route.params.id)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              setPost(snapshot.data())
            }
          })
      } else {
        //post item passed from Card component (entire post)
        setPost(route.params.item)
      }
      setLoading(false)
      setError(false)
    } catch (e) {
      console.log(`e`, e)
      setError(true)
      setLoading(false)
    }
  }
  const fetchPostUser = () => {
    if (post) {
      firebase
        .firestore()
        .collection("users")
        .doc(post.userID)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setPostUser(snapshot.data())
          }
        })
    }
  }
  //save the post images into state and map them into a formatted array
  //to display the images in imageView(carousel)
  const imagesMap = (arr) => {
    arr = arr.map((uri, index) => ({ source: { uri }, id: index + 1 }))
    setCarousel(arr)
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
        <AppButton
          title="Réessayer"
          onPress={() => setPost(route.params.item)}
        />
      </View>
    )
  }
  const contact = (input) => {
    if (input === "email") {
      Linking.openURL(`mailto:${post.email}`)
    } else {
      Linking.openURL(`tel:${post.tel}`)
    }
  }

  //Success
  if (post) {
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white" }}
        >
          <AppModal
            action={contact}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
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
              onPress={() => {
                setCarouselVisible(true)
              }}
            >
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </TouchableOpacity>
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
          {post.postType == "missings" ? (
            <DetailSection post={post} />
          ) : (
            <DetailSection2 post={post} />
          )}
        </ScrollView>
        {postUser && post.userID != currentUser.uid ? (
          <ProfileComponent
            image={postUser.image}
            title={postUser.name}
            subTitle={postUser.email}
            buttonTitle="Contacter"
            buttonAction={() => setModalVisible(true)}
            style2={styles.profileComponent}
          />
        ) : (
          <AppButton
            title="Modifier"
            onPress={() => navigation.navigate("PostEdit", post)}
          />
        )}
      </>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
})
