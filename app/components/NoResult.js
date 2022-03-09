import { StyleSheet, View } from "react-native"
import React from "react"
import ErrorSvg from "../../assets/svgs/ErrorSvg"
import AppText from "./AppText"

const NoResult = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        height: 300,
        alignItems: "center",
      }}
    >
      <ErrorSvg />
      <AppText>Aucun post pour l'instant</AppText>
    </View>
  )
}

export default NoResult

const styles = StyleSheet.create({})
