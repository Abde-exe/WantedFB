import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import * as Linking from "expo-linking"

import navigationTheme from "./navigationTheme"
import Main from "../screens/Main"
import FeedStack from "./FeedStack"
import AppTab from "./AppTab"
const Stack = createStackNavigator()

const prefix = Linking.makeUrl("https://missagora.com")
const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      AppTab: {
        screens: {
          FeedStack: {
            screens: {
              CardDetail: "posts/:id",
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
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} navigation={navigation} />
        <Stack.Screen
          name="AppTab"
          component={AppTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
