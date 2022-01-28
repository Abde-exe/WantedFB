import React, { useState, useEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"
import AuthStack from "./app/navigation/AuthStack"
import RootNavigator from "./app/navigation/RootNavigator"

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
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
