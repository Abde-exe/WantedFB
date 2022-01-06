import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, StackActions } from "@react-navigation/native"
import * as Linking from "expo-linking"

import navigationTheme from "./navigationTheme"
import AppTab from "./AppTab"
import { View } from "react-native"
import PostCreate from "../screens/PostCreate"
import IconButton from "../components/IconButton"
import colors from "../../config/colors"
import PostEdit from "../screens/PostEdit"
import SharingView from "../screens/SharingView"
import DoneAnimation from "../screens/DoneAnimation"
const Stack = createStackNavigator()

const prefix = Linking.makeUrl("/")
const linking = {
  prefixes: ["https://abdedev.fr", "https://*.abdedev.fr", prefix],
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
      <Stack.Navigator
        initialRouteName="AppTab"
        screenOptions={{ animationEnabled: false }}
        mode="modal"
      >
        <Stack.Screen
          name="AppTab"
          component={AppTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostCreate"
          component={PostCreate}
          options={{
            animationEnabled: true,
            headerTitle: null,
          }}
        />
        <Stack.Screen
          name="DoneAnimation"
          component={DoneAnimation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
