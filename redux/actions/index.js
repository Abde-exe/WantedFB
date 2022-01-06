//fetch user, save user, fetch post, save post...
import firebase from "firebase"

import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  ADD_USER_POST,
  DELETE_USER_POST,
  UPDATE_USER_POST,
  SAVE_POST,
  UNSAVE_POST,
  SAVED_POSTS_STATE_CHANGE,
} from "../constants"
export function fetchUser() {
  //prettier-ignore
  return ((dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
        } else {
          console.log("does not exist")
        }
      })
  })
}
export function fetchUserPosts() {
  //prettier-ignore
  return ((dispatch) => {
    let posts=[]
    let postTypes=["missings","students"]
    postTypes.forEach(element => {
    firebase
      .firestore()
      .collection(element)
      .orderBy("createdAt","desc")
      .get()
      .then((snapshot) => {
       
        snapshot.docs.map(doc=>{
          const data=doc.data()
           const id=doc.id
         if(  data.userID==firebase.auth().currentUser.uid )
         {
           posts.push({id,...data})
         } 
        })
          
      
      })  })
          dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
  })
}
export function addUserPost(post) {
  return (dispatch) => {
    dispatch({ type: ADD_USER_POST, post })
  }
}
export function deleteUserPost({ id, postType, images }, userId) {
  if (id) {
    //delete from the database
    firebase
      .firestore()
      .collection(postType)
      .doc(id)
      .delete()
      .then(() => {
        console.log(postType)
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

  //
  return (dispatch) => {
    dispatch({ type: DELETE_USER_POST, id })
  }
}

export function updateUserPost(post, values) {
  if (post) {
    //delete from the database
    firebase
      .firestore()
      .collection(post.postType)
      .doc(post.id)
      .set({
        ...values,
        postType: post.postType,
        createdAt: post.createdAt,
        userID: post.userID,
      })
      .then(() => {
        console.log(post.postType)
        navigation.navigate("DoneAnimation", { values })
      })
      .catch((error) => {
        console.error("Error removing document: ", error)
      })
  }
  return (dispatch) => {
    dispatch({ type: UPDATE_USER_POST, post })
  }
}

export function changeSavedPost(post, saved) {
  return (dispatch) => {
    if (saved) dispatch({ type: UNSAVE_POST, id })
    else {
      dispatch({ type: SAVE_POST, id })
    }
  }
}
export function fetchSavedPosts() {
  //prettier-ignore
  return ((dispatch) => {
const savedPosts= []
          dispatch({ type: SAVED_POSTS_STATE_CHANGE, savedPosts })
  })
}
