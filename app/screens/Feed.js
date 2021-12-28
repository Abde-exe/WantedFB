import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList, View } from "react-native"
import Firebase from "../../config/firebase"
import Card2 from "../components/Card2"
import Card3 from "../components/Card3"
import Screen from "../components/Screen"
import AppText from "../components/AppText"
import AppTextInput from "../components/AppTextInput"
import AppButton from "../components/AppButton"
import ActivityIndicator from "../components/ActivityIndicator"
import IconButton from "../components/IconButton"
import colors from "../../config/colors"
import Separator from "../components/Separator"
import AppPicker from "../components/AppPicker"
import dep from "../../data/departements-region.json"
const Feed = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [grid, setGrid] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchPosts()
  }, [])
  const fetchPosts = async () => {
    Firebase.firestore()
      .collection("missings")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        let postsArray = querySnapshot.docs.map((doc) => {
          const id = doc.id
          const data = doc.data()
          return { id, ...data }
        })
        if (filteredPosts.length == 0) {
          setPosts(postsArray)
          setFilteredPosts(postsArray)
        } else {
          setFilteredPosts(filteredPosts)
        }
      })

    setLoading(false)
  }
  const filtering = (filter) => {
    if (filter != "Aucun filtre") {
      const filteredList = posts.filter(
        (item) => item.location["dep"] == filter
      )
      setFilteredPosts(filteredList)
    } else {
      setFilteredPosts(posts)
    }
  }
  if (error) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <AppText style={{ textAlign: "center" }}>
          Erreur lors du chargement des posts
        </AppText>
        <AppButton title="Réessayer" onPress={fetchPosts} />
      </View>
    )
  }
  return (
    <Screen>
      <ActivityIndicator visible={loading} />

      <>
        <AppTextInput
          onSubmitEditing={() =>
            navigation.navigate("Search", {
              searchText,
              //postType: "missings",
              filteredPosts,
              posts,
            })
          }
          value={searchText}
          placeholder="Nom, prénom"
          rightIcon="close-circle"
          onChangeText={(value) => setSearchText(value)}
          OnPressRightIcon={() => setSearchText("")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <AppPicker
            placeholder="Département"
            items={dep}
            icon="map-marker"
            action={filtering}
          />

          <IconButton
            color={colors.primary}
            backgroundColor={colors.light}
            size={30}
            name={grid ? "view-list" : "view-grid"}
            onPress={() => setGrid(!grid)}
          />
        </View>
        <Separator />
        <View style={{ backgroundColor: colors.white, flex: 1 }}>
          {grid ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              key={"#"}
              style={{ marginLeft: 8 }}
              refreshing={refresh}
              onRefresh={() => fetchPosts()}
              numColumns={2}
              data={filteredPosts}
              keyExtractor={(item) => "#" + item.id}
              renderItem={({ item }) => <Card2 post={item} />}
              ListEmptyComponent={() => <AppText>Aucun résultat</AppText>}
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              key={"_"}
              refreshing={refresh}
              onRefresh={() => fetchPosts()}
              data={filteredPosts}
              keyExtractor={(item) => "_" + item.id}
              renderItem={({ item }) => <Card3 post={item} />}
              ListEmptyComponent={() => <AppText>Aucun résultat</AppText>}
            />
          )}
        </View>
      </>
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
