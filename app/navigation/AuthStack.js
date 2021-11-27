import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import Login from "../screens/auth/Login"
import SignUp from "../screens/auth/SignUp"
import ConfirmSignUp from "../screens/auth/ConfirmSignUp"
import ForgotPassword from "../screens/auth/ForgotPassword"
const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerTitleAlign: "center", headerTitle: "Wanted" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerTitleAlign: "center", headerTitle: "Wanted" }}
        />
        <Stack.Screen
          name="ConfirmSignUp"
          component={ConfirmSignUp}
          options={{ headerTitleAlign: "center", headerTitle: "Wanted" }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerTitleAlign: "center", headerTitle: "Wanted" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default AuthStack
