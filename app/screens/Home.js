import React, { useEffect } from "react"
import { View, Pressable, StyleSheet, Button } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import colors from "../../config/colors"
import AppText from "../components/AppText"
import Screen from "../components/Screen"
import Icon from "../components/Icon"
import firebase from "firebase"

import { fetchUserPosts, fetchUser } from "../../redux/actions"
import DogSvg from "../../assets/svgs/DogSvg"
import ObjectSvg from "../../assets/svgs/ObjectSvg"
import MissingSvg from "../../assets/svgs/MissingSvg"

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const { currentUser, posts } = useSelector((state) => state.user)
  useEffect(() => {
    !currentUser ? getUser() : null
    posts.length === 0 ? getUserPosts() : null
  }, [])

  const getUserPosts = async () => {
    let posts = []
    let postTypes = ["missings", "students", "animals","objects"]
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
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Pressable
            style={styles.view}
            onPress={() => navigation.navigate("Feed", { type: "missings" })}
          >
            <MissingSvg />
            <AppText style2={styles.text}>Personnes disparues</AppText>
          </Pressable>
          <Pressable
            style={styles.view}
            onPress={() => navigation.navigate("Feed", { type: "animals" })}
          >
            <DogSvg />
            <AppText style2={styles.text}>Animaux égarés</AppText>
          </Pressable>
          <Pressable
            style={styles.view}
            onPress={() => navigation.navigate("Feed", { type: "objects" })}
          >
            <ObjectSvg />
            <AppText style2={styles.text}>Objets perdus</AppText>
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
    width: "80%",
    height: "20%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
})
