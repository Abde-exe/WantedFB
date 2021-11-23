import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import Account from "../screens/Account"
import Messages from "../screens/Messages"
import UserPosts from "../screens/UserPosts"
import PostEdit from "../screens/PostEdit"
import PostDetail from "../screens/PostDetail"
import PostCreate from "../screens/PostCreate"

const Stack = createStackNavigator()
export default function AccountNavigator({}) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="UserPosts" component={UserPosts} />
      <Stack.Screen name="PostCreate" component={PostCreate} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="PostEdit" component={PostEdit} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
