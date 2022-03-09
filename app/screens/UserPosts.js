import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import firebase from "firebase"
import { useDispatch, useSelector } from "react-redux"
import Screen from "../components/Screen"
import Card3 from "../components/Card3"
import AppModal2 from "../components/AppModal2"
import { deleteUserPost } from "../../redux/actions"
import NoResult from "../components/NoResult"
const UserPosts = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [itemToDelete, setitemToDelete] = useState(null)
  const userId = firebase.auth().currentUser.uid
  const posts = useSelector((state) => state.user.posts)
  const [userPosts, setuserPosts] = useState(posts)
  const dispatch = useDispatch()

  const onDeletePost = () => {
    if (itemToDelete.id) {
      //delete from the list of post in this screen
      setuserPosts(userPosts.filter((i) => i.id != itemToDelete.id))
      setModalVisible(false)
      //delete from the database and the redux store
      deletePost(itemToDelete, userId)
    }
  }
  const deletePost = ({ id, postType, images }, userId) => {
    if (id) {
      //delete from the database
      firebase
        .firestore()
        .collection(postType)
        .doc(id)
        .delete()
        .then(() => {
          //dispatch for the store action
          dispatch(deleteUserPost(id))
        })
        .catch((error) => {
          console.error("Error removing document: ", error)
        })
    }
    //delete each of the post's images from the storage
    const childPath = `${postType}/${userId}`

    images.forEach((element) => {
      const end = element.indexOf("png")
      const name = element.substring(end - 37, end + 3)

      const ref = firebase.storage().ref(`${childPath}/${name}`)
      ref
        .delete()
        .then(() => {
          console.log(`success`)
        })
        .catch((error) => {
          console.log(`error`, error)
        })
    })
  }

  return (
    <Screen>
      <View>
        <AppModal2
          visible={modalVisible}
          onClose={setModalVisible}
          onPress={onDeletePost}
          text="Confirmer la suppression du post"
          confirmText="Supprimer"
        />
        <FlatList
          key={(item) => item.id}
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
          ListEmptyComponent={() => <NoResult />}
        />
      </View>
    </Screen>
  )
}

export default UserPosts
