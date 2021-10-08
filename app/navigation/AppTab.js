import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../../config/colors"
import NewPostButton from "./NewPostButton"
import PostEdit from "../screens/PostEdit"
import FeedStack from "./FeedStack"
import AccountNavigator from "./AccountNavigator"

import Icon from "../components/Icon"

const Tab = createBottomTabNavigator()

const AppTab = () => (
  <Tab.Navigator
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
      name={"PostEdit"}
      component={PostEdit}
      options={({ navigation }) => ({
        tabBarVisible: false,
        tabBarButton: () => (
          <NewPostButton onPress={() => navigation.navigate("PostEdit")} />
        ),
      })}
    />
    <Tab.Screen
      name="AccountNavigator"
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),

        headerShown: true,
        // title: 'My home',
        headerRight: () => (
          <View>
            <Button onPress={() => Auth.signOut({ global: true })} transparent>
              <Icon name="exit-to-app" style={{ iconColor: "black" }} />
            </Button>
          </View>
        ),
      }}
      component={AccountNavigator}
    />
  </Tab.Navigator>
)

export default AppTab
