import React, { useEffect } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { StackActions } from "@react-navigation/native"

import colors from "../../config/colors"
import { StyleSheet } from "react-native"
import AppBottomSheet from "./AppBottomSheet"
import { useSelector } from "react-redux"

const Stack = createStackNavigator()

const PostCreateStack = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    if (currentUser === null) {
      navigation.dispatch(StackActions.replace("Auth"))
    }
  }, [])
  return (
    <Stack.Navigator mode="modal" headerMode="none" >
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
