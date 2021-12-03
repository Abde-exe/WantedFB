import React from "react"
import { StyleSheet, Pressable } from "react-native"
import AppText from "./AppText"

const PickerItems = ({ label, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <AppText style2={styles.text}>{label}</AppText>
    </Pressable>
  )
}

export default PickerItems

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
})
