import React from "react"
import { StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
const Icon = ({
  name,
  backgroundColor = "black",
  size = 40,
  iconColor = "white",
}) => {
  return (
    <View
      style={{
        backgroundColor,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={name} size={size / 2} color={iconColor} />
    </View>
  )
}

export default Icon

const styles = StyleSheet.create({})
