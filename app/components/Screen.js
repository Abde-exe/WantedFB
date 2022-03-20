import React from "react"
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native"
import colors from "../../config/colors"
import Constants from "expo-constants"
export default function Screen({ children, style2 }) {
  return <SafeAreaView style={[styles.screen, style2]}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: Constants.statusBarHeight,
  },
  view: {
    flex: 1,
  },
})
