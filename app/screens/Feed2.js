import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList, Pressable, Text } from "react-native"
import Firebase from "../../config/firebase"
import Card from "../components/Card"
import Screen from "../components/Screen"
import AppText from "../components/AppText"
import AppTextInput from "../components/AppTextInput"
import AppButton from "../components/AppButton"
import ActivityIndicator from "../components/ActivityIndicator"

const Feed2 = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    setLoading(true)
    fetchPosts()
  }, [])
  const deleteF = async () => {
    //delete
  }
  const fetchPosts = async () => {
    Firebase.firestore()
      .collection("students")
      .get()
      .then((querySnapshot) => {
        let postsArray = querySnapshot.docs.map((doc) => {
          const id = doc.id
          const data = doc.data()
          return { id, ...data }
        })

        setPosts(postsArray)
      })

    setLoading(false)
  }
  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      {error ? (
        <>
          <AppText style={{ textAlign: "center" }}>
            Erreur lors du chargement des posts
          </AppText>
          <AppButton title="Réessayer" onPress={request} />
        </>
      ) : (
        <>
          <AppTextInput
            onSubmitEditing={() =>
              navigation.navigate("Search", { searchText })
            }
            value={searchText}
            placeholder="Rechercher..."
            rightIcon="close-circle"
            onChangeText={(value) => setSearchText(value)}
            OnPressRightIcon={() => setSearchText("")}
          />

          <FlatList
            refreshing={refresh}
            onRefresh={() => fetchPosts()}
            numColumns={1}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Card post={item} />}
          />
        </>
      )}
      {/* <AppButton title="Delete" onPress={deleteF} />
       */}
    </Screen>
  )
}

export default Feed2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
})
