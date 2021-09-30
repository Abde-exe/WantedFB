import React from "react"
import { StyleSheet, Text, Pressable, View } from "react-native"
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
