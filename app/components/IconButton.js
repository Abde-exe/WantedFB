import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const IconButton = ({
  color,
  size,
  onPress,
  name,
  backgroundColor,
  style2,
}) => {
  return (
    <Pressable
      style={(args) => {
        if (args.pressed) {
          return [
            {
              width: size,
              height: size,
              borderRadius: size,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.5,
            },
            style2,
          ]
        }

        return [
          {
            justifyContent: "center",
            alignItems: "center",
          },
          style2,
        ]
      }}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </Pressable>
  )
}

const styles = StyleSheet.create({})

export default IconButton
