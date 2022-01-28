//fetch user, save user, fetch post, save post...

import {
  USER_LOGIN,
  FETCH_USER_POSTS,
  DELETE_USER_POST,
  UPDATE_USER_POST,
  SAVE_POST,
  ADD_USER_POST,
  USER_LOGOUT,
} from "../constants"

export const logoutUser = () => {
  return (dispatch) => dispatch({ type: USER_LOGOUT })
}
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
  console.log(`post.name`, post.name)
  dispatch({ type: ADD_USER_POST, payload: post })
}
export const fetchUser = (user) => (dispatch) => {
  console.log("test")
  dispatch({
    type: USER_LOGIN,
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
