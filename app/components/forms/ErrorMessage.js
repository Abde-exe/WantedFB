import React from "react"
import { StyleSheet } from "react-native"
import colors from "../../../config/colors"
import AppText from "../AppText"

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) return null

  return <AppText style2={styles.error}>{error}</AppText>
}

export default ErrorMessage

const styles = StyleSheet.create({
  error: { color: colors.danger, marginLeft: 16, fontSize: 16 },
})
