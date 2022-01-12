import React, { useEffect } from "react"
import { View, Pressable, StyleSheet, Button } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import colors from "../../config/colors"
import AppText from "../components/AppText"
import Screen from "../components/Screen"
import Icon from "../components/Icon"
import firebase from "firebase"

import { fetchUserPosts, fetchUser } from "../../redux/actions"

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const { currentUser, posts } = useSelector((state) => state.user)
  useEffect(() => {
    !currentUser ? getUser() : null
    posts.length === 0 ? getUserPosts() : null
  }, [])

  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(`error`, error)
      })
  }
  const getUserPosts = async () => {
    let posts = []
    let postTypes = ["missings", "students"]
    await Promise.all(
      postTypes.map(async (element) => {
        await firebase
          .firestore()
          .collection(element)
          .orderBy("createdAt", "desc")
          .get()
          .then((snapshot) => {
            snapshot.docs.map((doc) => {
              const data = doc.data()
              const id = doc.id
              if (data.userID == firebase.auth().currentUser.uid) {
                posts.push({ id, ...data })
              }
            })
          })
      })
    )
    dispatch(fetchUserPosts(posts))
  }
  const getUser = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch(fetchUser(snapshot.data()))
        } else {
          console.log("does not exist")
        }
      })
  }
  return (
    <Screen>
      <View style={{ flexDirection: "column", flex: 1 }}>
        {currentUser && (
          <AppText style={{ fontSize: 32, marginLeft: 16 }}>
            Bonjour {currentUser.name}
          </AppText>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Pressable
            style={styles.view}
            onPress={() => navigation.navigate("Feed")}
          >
            <Icon
              size={80}
              name="account-child"
              iconColor={colors.secondary}
              backgroundColor="white"
            />
            <AppText style2={styles.text}>Disparitions</AppText>
          </Pressable>
        </View>
      </View>
    </Screen>
  )
}

export default Home

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    color: colors.white,
    fontSize: 32,
    marginLeft: 8,
    alignSelf: "flex-start",
  },
  text: {
    textAlign: "center",
    color: colors.white,
  },
  view: {
    backgroundColor: colors.primary,
    width: "50%",
    height: "25%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 200,
  },
})
