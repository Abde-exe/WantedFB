import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import navigationTheme from "./navigationTheme"
import Main from "../screens/Main"
import FeedStack from "./FeedStack"
import AppTab from "./AppTab"
const Stack = createStackNavigator()

const RootNavigator = ({ navigation }) => {
  return (
    <NavigationContainer theme={navigationTheme}>
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
