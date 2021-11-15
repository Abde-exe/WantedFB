import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PostEdit2 from "../screens/PostEdit2"
import SharingView from "../screens/SharingView"
const Stack = createStackNavigator()

const PostEditStack = () => {
  return (
    <Stack.Navigator initialRouteName="PostEdit2">
      <Stack.Screen name="PostEdit2" component={PostEdit2} />
      <Stack.Screen name="SharingView" component={SharingView} />
    </Stack.Navigator>
  )
}

export default PostEditStack
