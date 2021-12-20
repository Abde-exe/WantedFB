import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import firebase from "firebase"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { deleteUserPost, fetchUserPosts } from "../../redux/actions/index"
import Screen from "../components/Screen"
import Card3 from "../components/Card3"
import AppModal2 from "../components/AppModal2"

const UserPosts = ({ posts }) => {
  const [userPosts, setuserPosts] = useState(posts)
  const [modalVisible, setModalVisible] = useState(false)
  const [itemToDelete, setitemToDelete] = useState(null)

  const onDeletePost = () => {
    if (itemToDelete.id) {
      //delete from the list of post in this screen
      setuserPosts(userPosts.filter((i) => i.id != itemToDelete.id))
      setModalVisible(false)
      //delete from the database and the store
      deleteUserPost(itemToDelete)

      // //delete from the database
      // firebase
      //   .firestore()
      //   .collection(itemToDelete.postType)
      //   .doc(itemToDelete.id)
      //   .delete()
      //   .then(() => {
      //     console.log(itemToDelete.postType)
      //     //delete from the redux store
      //     deleteUserPost(itemToDelete.id)
      //     //delete from the array of posts in this screen
      //     setuserPosts(userPosts.filter((i) => i.id != itemToDelete.id))
      //     setModalVisible(false)
      //   })
      //   .catch((error) => {
      //     console.error("Error removing document: ", error)
      //   })
    }
  }
  if (posts.length != 0) {
    return (
      <Screen>
        <View>
          <AppModal2
            visible={modalVisible}
            onClose={setModalVisible}
            onPress={onDeletePost}
          />
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card3
                post={item}
                onIconPress={() => {
                  setModalVisible(true)
                  setitemToDelete({ id: item.id, postType: item.postType })
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
  posts: store.userState.posts,
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteUserPost,
      fetchUserPosts,
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(UserPosts)

const styles = StyleSheet.create({})
