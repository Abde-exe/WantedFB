import React from "react"
import { StyleSheet, Text } from "react-native"
import colors from "../../config/colors"
const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null
  }

  return <Text style={styles.errorText}>⚠️ {error}</Text>
}

const styles = StyleSheet.create({
  errorText: {
    color: colors.danger,
    fontSize: 20,
    marginLeft: 16,
    marginBottom: 10,
    fontWeight: "600",
  },
})

export default ErrorMessage
