import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  ADD_USER_POST,
  DELETE_USER_POST,
  UPDATE_USER_POST,
} from "../constants"

const initialState = {
  currentUser: null,
  posts: [],
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return { ...state, currentUser: action.currentUser }
      break
    case USER_POSTS_STATE_CHANGE:
      return { ...state, posts: action.posts }
      break
    case ADD_USER_POST:
      return { ...state, posts: [action.post, ...state.posts] }
      break
    case DELETE_USER_POST:
      return {
        ...state,
        posts: state.posts.filter((item) => item.id !== action.id),
      }
      break
    case UPDATE_USER_POST:
      const index = state.posts.findIndex((post) => post.id == action.post.id)
      const newArray = [...state.posts]
      newArray[index] = action.post
      return {
        ...state,
        posts: newArray,
      }
      break

    default:
      return state
      break
  }
}
