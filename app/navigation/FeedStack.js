import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import Feed from "../screens/Feed"

import {
  getFocusedRouteNameFromRoute,
  StackActions,
} from "@react-navigation/native"
import Search from "../screens/Search"
import PostDetail from "../screens/PostDetail"
import PostEdit from "../screens/PostEdit"
import Home from "../screens/Home"
import SharingView from "../screens/SharingView"
import IconButton from "../components/IconButton"
import colors from "../../config/colors"

const Stack = createStackNavigator()
export default function FeedStack({ navigation, route }) {
  //hide the bottom tabBar only for PostDetail or SharingView screens
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (
      routeName === "PostDetail" ||
      routeName === "SharingView" ||
      routeName === "PostEdit"
    ) {
      navigation.setOptions({ tabBarVisible: false })
    } else {
      navigation.setOptions({ tabBarVisible: true })
    }
  })
  /////

  return (
    <Stack.Navigator
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
        name={"PostDetail"}
        component={PostDetail}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <Stack.Screen
        name="PostEdit"
        component={PostEdit}
        options={{
          headerTitle: null,
          headerRight: (props) => (
            <View style={{ marginRight: 16 }}>
              <IconButton
                onPress={() => navigation.dispatch(StackActions.popToTop())}
                name="close-circle"
                size={30}
                color={colors.medium}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name={"Search"}
        component={Search}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name={"SharingView"}
        component={SharingView}
        options={{
          headerTitle: null,
          headerLeft: null,
          headerRight: (props) => (
            <View style={{ marginRight: 16 }}>
              <IconButton
                onPress={() => navigation.dispatch(StackActions.popToTop())}
                name="close-circle"
                size={30}
                color={colors.medium}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
