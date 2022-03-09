import React, { useState, useEffect } from "react"
import { View, FlatList } from "react-native"
//import firebase from "firebase"

import Card from "../components/Card"
import AppTextInput from "../components/AppTextInput"
import AppText from "../components/AppText"
import NoResult from "../components/NoResult"

const Search = ({ route }) => {
  const postsList = route.params.filteredPosts
    ? route.params.filteredPosts
    : route.params.posts
  const [posts, setPosts] = useState(postsList)
  const [result, setResult] = useState([])
  const [searchText, setSearchText] = useState(route.params.searchText)

  useEffect(() => {
    searchPosts(route.params.searchText)
  }, [])

  // const searchPosts2 = (value) => {
  //   firebase
  //     .firestore()
  //     .collection(postType)
  //     .where("title", ">=", value)
  //     .get()
  //     .then((snapshot) => {
  //       let posts = snapshot.docs.map((doc) => {
  //         const data = doc.data()
  //         const id = doc.id
  //         return { id, ...data }
  //       })
  //       setPosts(posts)
  //     })
  // }
  const searchPosts = (value) => {
    value = value.toLowerCase()
    let filteredList = []
    if (value == "") {
      //no text search
      setResult([])
    } else {
      filteredList = posts.filter((item) =>
        item.title.toLowerCase().includes(value)
      )
      setResult(filteredList)
    }
  }
  return (
    <View style={{ flex: 1 }}>
      {/* <AppTextInput
        onSubmitEditing={() => searchPosts(searchText)}
        value={searchText}
        placeholder="Rechercher..."
        rightIcon="close-circle"
        onChangeText={(value) => setSearchText(value)}
        OnPressRightIcon={() => setSearchText("")}
      /> */}

      <AppText>{result.length} résultat(s)</AppText>

      <FlatList
        data={result}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card post={item} />}
        ListEmptyComponent={() => <NoResult />}
      />
    </View>
  )
}

export default Search
