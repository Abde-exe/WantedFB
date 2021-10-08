import React from "react"
import { Pressable, StyleSheet, Platform } from "react-native"
import colors from "../../config/colors"
import AppText from "./AppText"

const AppButton = ({
  title,
  color = "primary",
  text = "white",
  onPress,
  width = "90%",
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: colors[color], width: width },
      ]}
    >
      <AppText style2={[styles.text, { color: colors[text] }]}>{title}</AppText>
    </Pressable>
  )
}
export default AppButton
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
})
