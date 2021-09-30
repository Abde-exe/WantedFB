import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons"
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
      <MaterialCommunityIcons name={name} size={size * 0.5} color={iconColor} />
    </View>
  )
}

export default Icon

const styles = StyleSheet.create({})
