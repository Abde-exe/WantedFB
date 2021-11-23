import React from "react"
import { StyleSheet, SafeAreaView, View, StatusBar } from "react-native"
import Constants from "expo-constants"
import colors from "../../config/colors"

export default function Screen({ children, style2 }) {
  return (
    <SafeAreaView style={[styles.screen, style2]}>
      <StatusBar
        animated={true}
        backgroundColor={colors.primary}
        translucent={false}
      />
      <View style={[style2, styles.view]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 8,
  },
  view: {
    flex: 1,
  },
})
