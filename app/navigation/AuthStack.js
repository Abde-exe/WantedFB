import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import Login from "../screens/auth/Login"
import SignUp from "../screens/auth/SignUp"
import ConfirmSignUp from "../screens/auth/ConfirmSignUp"
import ForgotPassword from "../screens/auth/ForgotPassword"
import BaseNavigator from "./BaseNavigator"
const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "Se connecter" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitleAlign: "center", headerTitle: "S'inscrire" }}
      />
      <Stack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Confirmer l'inscription",
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Réinitialiser le mot de passe",
        }}
      />
      <Stack.Screen name="BaseNavigator" component={BaseNavigator} />
    </Stack.Navigator>
  )
}
export default AuthStack
