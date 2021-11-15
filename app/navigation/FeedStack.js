import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import CardDetail from "../screens/CardDetail"
import Feed from "../screens/Feed"
import Feed2 from "../screens/Feed2"

import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import Search from "../screens/Search"

const Stack = createStackNavigator()
export default function FeedStack({ navigation, route }) {
  //hide the bottom tabBar only for CardDetail screen
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName === "CardDetail") {
      navigation.setOptions({ tabBarVisible: false })
    } else {
      navigation.setOptions({ tabBarVisible: true })
    }
  })
  /////

  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{ animationEnabled: true }}
    >
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
        name={"CardDetail"}
        component={CardDetail}
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
