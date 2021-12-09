import React from "react"
import { StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
const Icon = ({
  name,
  backgroundColor = "black",
  size = 40,
  iconColor = "white",
  style2,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor,
          width: size,
          height: size,
          borderRadius: size / 2,
          justifyContent: "center",
          alignItems: "center",
        },
        style2,
      ]}
    >
      <MaterialCommunityIcons name={name} size={size / 2} color={iconColor} />
    </View>
  )
}

export default Icon

const styles = StyleSheet.create({})
