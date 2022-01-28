import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../../config/colors"
import NewPostButton from "./NewPostButton"
import FeedStack from "./FeedStack"
import AccountNavigator from "./AccountNavigator"
import PostCreateStack from "./PostCreateStack"
import { View, StyleSheet } from "react-native"
import AppBottomSheet from "./AppBottomSheet"
import { useSelector } from "react-redux"

const Tab = createBottomTabNavigator()

const AppTab = ({ navigation }) => {
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
          options={{
            //tabBarVisible: false,
            tabBarIcon: () => (
              <View style={styles.container}>
                <MaterialCommunityIcons
                  name="plus-circle"
                  size={30}
                  color={colors.white}
                />
              </View>
            ),

            // tabBarButton: () => (
            //   <NewPostButton
            //     onPress={() => navigation.navigate("PostCreateStack")}
            //   />
            // ),
          }}
          // listeners={({ navigation }) => ({
          //   tabPress: (event) => {
          //     event.preventDefault()
          //     setisOpen(true)
          //      navigation.navigate("PostCreate")
          //   },
          // })}
        />
        <Tab.Screen
          name="AccountNavigator"
          options={{
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
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: colors.white,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
  },
})
export default AppTab
