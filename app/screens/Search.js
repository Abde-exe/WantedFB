import React, { useState } from "react"
import { View, Text, TextInput, FlatList } from "react-native"
import firebase from "firebase"

import Card from "../components/Card"
import AppTextInput from "../components/AppTextInput"
const Search = () => {
  const [posts, setposts] = useState([])

  const fetchPosts = (search) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
          return { id, ...data }
        })
        setposts(posts)
      })
  }
  return (
    <View>
      <AppTextInput
        onChangeText={(search) => fetchPosts(search)}
        rightIcon="magnify"
        placeholder="rechercher..."
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  )
}

export default Search
