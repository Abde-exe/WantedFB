import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import AppTab from "./AppTab"
import { View } from "react-native"
import PostCreate from "../screens/PostCreate"
import IconButton from "../components/IconButton"
import colors from "../../config/colors"
import SharingView from "../screens/SharingView"
import DoneAnimation from "../screens/DoneAnimation"
const Stack = createStackNavigator()

const BaseNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="AppTab"
      screenOptions={{ animationEnabled: false,headerBackTitle:'' }}
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
  )
}

export default BaseNavigator
