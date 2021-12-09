import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import Feed from "../screens/Feed"
import Feed2 from "../screens/Feed2"

import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import Search from "../screens/Search"
import PostDetail from "../screens/PostDetail"
import Home from "../screens/Home"
import SharingView from "../screens/SharingView"

const Stack = createStackNavigator()
export default function FeedStack({ navigation, route }) {
  //hide the bottom tabBar only for PostDetail or SharingView screens
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName === "PostDetail" || routeName === "SharingView") {
      navigation.setOptions({ tabBarVisible: false })
    } else {
      navigation.setOptions({ tabBarVisible: true })
    }
  })
  /////

  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: true }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name={"Home"}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Feed"}
        component={Feed}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Feed2"}
        component={Feed2}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={"PostDetail"}
        component={PostDetail}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <Stack.Screen
        name={"SharingView"}
        component={SharingView}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={"Search"}
        component={Search}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
