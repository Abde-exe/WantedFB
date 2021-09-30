import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Routes from "./app/navigation"

export default function App() {
  return <Routes />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
