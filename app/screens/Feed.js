import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList } from "react-native"
import Firebase from "../../config/firebase"
import Card2 from "../components/Card2"
import Screen from "../components/Screen"
import AppText from "../components/AppText"
import AppButton from "../components/AppButton"
import ActivityIndicator from "../components/ActivityIndicator"
import { set } from "react-native-reanimated"

const Feed = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchPosts()
  }, [])
  const deleteF = async () => {
    //delete
  }
  const fetchPosts = async () => {
    Firebase.firestore()
      .collection("posts")
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
        <FlatList
          refreshing={refresh}
          onRefresh={() => fetchPosts()}
          numColumns={2}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card2 item={item} />}
        />
      )}
      {/* <AppButton title="Delete" onPress={deleteF} />
       */}
    </Screen>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
})
