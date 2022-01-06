import React, { useState, useEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import firebase from "firebase"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./redux/reducers"
import thunk from "redux-thunk"
export const store = createStore(rootReducer, applyMiddleware(thunk))

import AuthStack from "./app/navigation/AuthStack"
import RootNavigator from "./app/navigation/RootNavigator"

export default function App() {
  const [loggedIn, setloggedIn] = useState(false)
  const [loaded, setloaded] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setloggedIn(false), setloaded(true)
      } else {
        setloggedIn(true)
        setloaded(true)
      }
    })
  }, [])

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  if (loggedIn == false) {
    return <AuthStack />
  }
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
