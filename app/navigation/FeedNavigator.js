import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import CardDetail from "../screens/CardDetail"
import Feed from "../screens/Feed"
import Test from "../screens/Test"
import routes from "./routes"
import Test2 from "../screens/Test2"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"

const Stack = createStackNavigator()
export default function FeedNavigator({ navigation, route }) {
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
      <Stack.Screen name={routes.FEED} component={Feed} />
      <Stack.Screen name={routes.CARD_DETAIL} component={CardDetail} />
      <Stack.Screen name={"Test"} component={Test} />
      <Stack.Screen name={"Test2"} component={Test2} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
