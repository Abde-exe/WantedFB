import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import * as Linking from "expo-linking"

import navigationTheme from "./navigationTheme"
import Test from "../screens/Test"
import AppTab from "./AppTab"
const Stack = createStackNavigator()

const prefix = Linking.makeUrl("/")
const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      AppTab: {
        screens: {
          FeedStack: {
            screens: {
              PostDetail: "posts/:id",
              Feed: "Feed",
            },
          },
        },
      },
    },
  },
}
const RootNavigator = ({ navigation }) => {
  return (
    <NavigationContainer theme={navigationTheme} linking={linking}>
      <Stack.Navigator initialRouteName="AppTab" headerMode="none">
        <Stack.Screen name="AppTab" component={AppTab} />
        <Stack.Screen
          name="Test"
          component={Test}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
