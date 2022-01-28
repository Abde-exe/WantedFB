import React, { useState, useEffect } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { ActivityIndicator, View } from "react-native"
import BaseNavigator from "./BaseNavigator"
import AuthStack from "./AuthStack"
import firebase from "firebase"
import * as Linking from "expo-linking"

import navigationTheme from "./navigationTheme"
const Stack = createStackNavigator()

const RootNavigator = () => {
  const [loggedIn, setloggedIn] = useState(false)
  const [loaded, setloaded] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setloggedIn(false), setloaded(true)
      } else {
        setloggedIn(true)
        setloaded(true)
      }
    })
  }, [])

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

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer theme={navigationTheme} linking={linking}>
      <Stack.Navigator
        initialRouteName={loggedIn ? "Root" : "Auth"}
        headerMode="none"
      >
        <Stack.Screen name="Auth" component={AuthStack} />

        <Stack.Screen name="Root" component={BaseNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
