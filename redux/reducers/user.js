import {
  USER_STATE_CHANGE,
  ADD_USER_POST,
  DELETE_USER_POST,
  UPDATE_USER_POST,
  SAVED_POSTS_STATE_CHANGE,
  SAVE_POST,
  UNSAVE_POST,
  FETCH_USER_POSTS,
} from "../constants"

const initialState = {
  currentUser: null,
  posts: [],
  savedPosts: [],
}

export default user = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case USER_STATE_CHANGE:
      newState = { ...state, currentUser: action.payload }
      return newState
      break
    case FETCH_USER_POSTS:
      newState = { ...state, posts: action.payload }
      return newState
      break
    case ADD_USER_POST:
      newState = { ...state, posts: [action.payload, ...state.posts] }
      return newState
      break
    case DELETE_USER_POST:
      newState = {
        ...state,
        posts: state.posts.filter((item) => item.id !== action.payload),
        savedPosts: state.savedPosts.filter(
          (item) => item.id !== action.payload
        ),
      }
      return newState
      break
    case UPDATE_USER_POST:
      const index = state.posts.findIndex(
        (post) => post.id !== action.payload.id
      )
      const newArray = [...state.posts]
      newArray[index] = action.payload
      return {
        ...state,
        posts: newArray,
      }
      break
    case SAVED_POSTS_STATE_CHANGE:
      return { ...state, savedPosts: action.savedPosts }
      break
    case SAVE_POST:
      let newState = {}
      if (action.payload.saved) {
        newState = {
          ...state,
          savedPosts: [
            { ...action.payload.post, saved: action.payload.saved },
            ...state.savedPosts,
          ],
        }
      } else {
        newState = {
          ...state,
          savedPosts: state.savedPosts.filter(
            (item) => item.id !== action.payload.post.id
          ),
        }
      }
      return newState
      break
    default:
      return state
      break
  }
}
