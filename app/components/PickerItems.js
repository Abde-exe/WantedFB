import React from "react"
import { StyleSheet, Pressable } from "react-native"
import colors from "../../config/colors"
import AppText from "./AppText"
import Separator from "./Separator"

const PickerItems = ({ label, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={(args) => {
        if (args.pressed) {
          return [
            {
              backgroundColor: "transparent",
              opacity: 0.5,
            },
          ]
        }
      }}
    >
      <AppText style2={styles.text}>{label}</AppText>
      <Separator />
    </Pressable>
  )
}

export default PickerItems

const styles = StyleSheet.create({})
