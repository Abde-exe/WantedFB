//fetch user, save user, fetch post, save post...
import firebase from "firebase"

import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from "../constants"
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
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("createdAt","asc")
      .get()
      .then((snapshot) => {
        let posts= snapshot.docs.map(doc=>{
          const data=doc.data()
          const id=doc.id
          return {id,...data}
        })
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
      })
  })
}
