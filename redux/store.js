import thunk from "redux-thunk"
import { applyMiddleware, createStore, combineReducers } from "redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistStore, persistReducer } from "redux-persist"
import user from "./reducers/user"
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["savedPosts", "post", "currentUser"],
}
const rootReducer = combineReducers({
  user: persistReducer(persistConfig, user),
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
