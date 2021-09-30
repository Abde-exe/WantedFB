import React, { Component } from "react"
import { Text, StyleSheet, View, Pressable } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../config/colors"

export default NewPostButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          size={30}
          color={colors.white}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 8,
    borderColor: colors.white,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
  },
})
