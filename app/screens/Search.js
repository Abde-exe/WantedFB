import React, { useState, useEffect } from "react"
import { View, FlatList } from "react-native"
import firebase from "firebase"

import Card from "../components/Card"
import AppTextInput from "../components/AppTextInput"
import AppText from "../components/AppText"

const Search = ({ route }) => {
  const postType = route.params.postType
  const [posts, setposts] = useState([])
  const [searchText, setSearchText] = useState(route.params.searchText)

  useEffect(() => {
    searchPosts(route.params.searchText)
  }, [])

  const searchPosts = (value) => {
    firebase
      .firestore()
      .collection(postType)
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
  const searchPosts2 = (value) => {
    console.log(`value`, posts)
    posts.forEach((element) => {
      console.log(`element.name`, element)
    })
    // const filteredList = posts.filter((item) => item.age == 21)
    // setposts(filteredList)
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
      {posts.length ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card post={item} />}
        />
      ) : (
        <AppText>Pas de résultats pour votre recherche malheureusement</AppText>
      )}
    </View>
  )
}

export default Search
