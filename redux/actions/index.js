//fetch user, save user, fetch post, save post...
import firebase from "firebase"

import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  ADD_USER_POST,
  DELETE_USER_POST,
  UPDATE_USER_POST,
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
      .orderBy("createdAt","asc")
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
export function deleteUserPost({ id, postType }) {
  if (id) {
    //delete from the database
    firebase
      .firestore()
      .collection(postType)
      .doc(id)
      .delete()
      .then(() => {
        console.log(postType)
        //delete from the redux store
        //delete from the array of posts in this screen
      })
      .catch((error) => {
        console.error("Error removing document: ", error)
      })
  }
  return (dispatch) => {
    dispatch({ type: DELETE_USER_POST, id })
  }
}

export function updateUserPost(post) {
  dispatch({ type: UPDATE_USER_POST, post })
}
