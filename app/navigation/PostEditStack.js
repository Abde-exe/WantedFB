import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PostEdit from "../screens/PostEdit"
import SharingView from "../screens/SharingView"
const Stack = createStackNavigator()

const PostEditStack = () => {
  return (
    <Stack.Navigator initialRouteName="PostEdit">
      <Stack.Screen name="PostEdit" component={PostEdit} />
      <Stack.Screen name="SharingView" component={SharingView} />
    </Stack.Navigator>
  )
}

export default PostEditStack
