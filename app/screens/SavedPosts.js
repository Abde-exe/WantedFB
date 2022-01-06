import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import firebase from "firebase"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchSavedPosts } from "../../redux/actions/index"
import Screen from "../components/Screen"
import Card3 from "../components/Card3"
import AppModal2 from "../components/AppModal2"

const SavedPosts = ({ savedPosts }) => {
  const [posts, setPosts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [itemToDelete, setitemToDelete] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const userId = firebase.auth().currentUser.uid

  if (savedPosts.length != 0) {
    return (
      <Screen>
        <View>
          <FlatList
            refreshing={refresh}
            onRefresh={() => fetchSavedPosts()}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card3
                post={item}
                onIconPress={() => {
                  setModalVisible(true)
                  setitemToDelete({
                    id: item.id,
                    postType: item.postType,
                    images: item.images,
                  })
                }}
              />
            )}
          />
        </View>
      </Screen>
    )
  } else {
    return (
      <View>
        <Text>Pas encore de post</Text>
      </View>
    )
  }
}

const mapStateToProps = (store) => ({
  savedPosts: store.userState.savedPosts,
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchSavedPosts,
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(SavedPosts)

const styles = StyleSheet.create({})
