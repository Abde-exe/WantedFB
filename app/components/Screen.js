import React from "react"
import { StyleSheet, SafeAreaView, View, StatusBar } from "react-native"
import colors from "../../config/colors"

export default function Screen({ children, style2 }) {
  return (
    <SafeAreaView style={[styles.screen, style2]}>
      <StatusBar
        animated={true}
        backgroundColor={colors.primary}
        // translucent={false}
      />
      <View style={[style2, styles.view]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  view: {
    flex: 1,
  },
})
