import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import firebase from "firebase"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { deleteUserPost } from "../../redux/actions/index"

import Card3 from "../components/Card3"
import AppModal2 from "../components/AppModal2"

const UserPosts = (props) => {
  const [userPosts, setuserPosts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [itemToDelete, setitemToDelete] = useState(null)
  //state from redux store
  const { posts } = props

  useEffect(() => {
    setuserPosts(posts)
  }, [posts])

  const onDeletePost = () => {
    if (itemToDelete.id) {
      setuserPosts(userPosts.filter((i) => i.id != itemToDelete.id))
      setModalVisible(false)
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
              item={item}
              onIconPress={() => {
                setModalVisible(true)
                setitemToDelete({ id: item.id, postType: item.postType })
              }}
            />
          )}
        />
      </View>
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
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(UserPosts)

const styles = StyleSheet.create({})
