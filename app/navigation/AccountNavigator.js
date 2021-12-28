import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"

import Account from "../screens/Account"
import Messages from "../screens/Messages"
import UserPosts from "../screens/UserPosts"
import PostEdit from "../screens/PostEdit"
import PostDetail from "../screens/PostDetail"
import PostCreate from "../screens/PostCreate"
import IconButton from "../components/IconButton"
import colors from "../../config/colors"

const Stack = createStackNavigator()
export default function AccountNavigator({ navigation, route }) {
  //hide the bottom tabBar only for PostDetail or SharingView screens
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName === "PostEdit") {
      navigation.setOptions({ tabBarVisible: false })
    } else {
      navigation.setOptions({ tabBarVisible: true })
    }
  })
  /////
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ title: "Profil" }}
      />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen
        name="UserPosts"
        component={UserPosts}
        options={{ title: "Mes posts" }}
      />
      <Stack.Screen name="PostCreate" component={PostCreate} />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostEdit"
        component={PostEdit}
        options={{
          headerTitle: null,
          headerRight: (props) => (
            <View style={{ marginRight: 16 }}>
              <IconButton
                onPress={() => navigation.navigate("Home")}
                name="close-circle"
                size={30}
                color={colors.medium}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
