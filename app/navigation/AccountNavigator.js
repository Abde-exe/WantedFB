import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import Account from "../screens/Account"
import Messages from "../screens/Messages"

const Stack = createStackNavigator()
export default function AccountNavigator({}) {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
