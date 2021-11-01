import React, { useState, useEffect } from "react"
import { View, Text, TextInput, FlatList } from "react-native"
import firebase from "firebase"

import Card from "../components/Card"
import AppTextInput from "../components/AppTextInput"

const Search = ({ route }) => {
  const [posts, setposts] = useState([])
  const [searchText, setSearchText] = useState(route.params.searchText)

  useEffect(() => {
    searchPosts(route.params.searchText)
  }, [])

  const searchPosts = (value) => {
    firebase
      .firestore()
      .collection("posts")
      .where("name", ">=", value)
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
        onSubmitEditing={() => searchPosts(searchText)}
        value={searchText}
        placeholder="Rechercher..."
        rightIcon="close-circle"
        onChangeText={(value) => setSearchText(value)}
        OnPressRightIcon={() => setSearchText("")}
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
