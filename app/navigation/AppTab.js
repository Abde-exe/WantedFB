import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../../config/colors"
import NewPostButton from "./NewPostButton"
import FeedStack from "./FeedStack"
import AccountNavigator from "./AccountNavigator"
import PostCreateStack from "./PostCreateStack"
import Icon from "../components/Icon"

const Tab = createBottomTabNavigator()

const AppTab = () => {
  return (
    <>
      <Tab.Navigator
        headerMode="none"
        tabBarOptions={{
          activeBackgroundColor: "white",
          activeTintColor: colors.primary,
          inactiveTintColor: colors.medium,
          showLabel: false,
        }}
      >
        <Tab.Screen
          name={"FeedStack"}
          component={FeedStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={"PostCreateStack"}
          component={PostCreateStack}
          options={({ navigation }) => ({
            tabBarVisible: false,
            tabBarButton: () => (
              <NewPostButton
                onPress={() => navigation.navigate("PostCreateStack")}
              />
            ),
          })}
        />
        <Tab.Screen
          name="AccountNavigator"
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),

            headerShown: true,
          }}
          component={AccountNavigator}
        />
      </Tab.Navigator>
    </>
  )
}

export default AppTab
