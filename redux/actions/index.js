//fetch user, save user, fetch post, save post...
import firebase from "firebase"

import {
  USER_STATE_CHANGE,
  FETCH_USER_POSTS,
  DELETE_USER_POST,
  UPDATE_USER_POST,
  SAVE_POST,
  SAVED_POSTS_STATE_CHANGE,
  ADD_USER_POST,
} from "../constants"

export const fetchUserPosts = (posts) => {
  try {
    return (dispatch) => {
      dispatch({ type: FETCH_USER_POSTS, payload: posts })
    }
  } catch (e) {
    console.log(`error`, e)
  }
}
export const addUserPost = (post) => (dispatch) => {
  dispatch({ type: ADD_USER_POST, payload: post })
}
export const fetchUser = (user) => (dispatch) => {
  dispatch({
    type: USER_STATE_CHANGE,
    payload: user,
  })
}

export const deleteUserPost = (id) => (dispatch) => {
  dispatch({ type: DELETE_USER_POST, payload: id })
}
export const updateUserPost = (post) => (dispatch) => {
  dispatch({ type: UPDATE_USER_POST, payload: post })
}
export const changeSavedPost = (post, saved) => {
  return (dispatch) => {
    dispatch({ type: SAVE_POST, payload: { post, saved } })
  }
}
const fetchSavedPosts = () => {
  //prettier-ignore
  return ((dispatch) => {
const savedPosts= []
          dispatch({ type: SAVED_POSTS_STATE_CHANGE, savedPosts })
  })
}
