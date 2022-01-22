import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { StackActions } from "@react-navigation/native"

import SharingView from "../screens/SharingView"
import colors from "../../config/colors"
import { View, StyleSheet, Pressable } from "react-native"
import IconButton from "../components/IconButton"
import AppBottomSheet from "./AppBottomSheet"

const Stack = createStackNavigator()

const PostCreateStack = ({ navigation }) => {
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen component={AppBottomSheet} name="AppBottomSheet" />
    </Stack.Navigator>
  )
}

export default PostCreateStack

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    color: colors.white,
    fontSize: 32,
    marginLeft: 8,
    alignSelf: "flex-start",
  },
  text: {
    textAlign: "center",
    color: colors.white,
  },
  view: {
    backgroundColor: colors.primary,
    width: "50%",
    height: "25%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
})
