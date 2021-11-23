import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PostCreate from "../screens/PostCreate"
import SharingView from "../screens/SharingView"
import Icon from "../components/Icon"
import colors from "../../config/colors"
import { View, StyleSheet, Pressable } from "react-native"
import AppText from "../components/AppText"

const Stack = createStackNavigator()

const PostCreateStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      initialRouteName="PostCreateMenu"
    >
      <Stack.Screen name="PostCreateMenu" component={PostCreateMenu} />
      <Stack.Screen name="PostCreate" component={PostCreate} />
      <Stack.Screen name="SharingView" component={SharingView} />
    </Stack.Navigator>
  )
}

export default PostCreateStack
const PostCreateMenu = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Pressable
        style={styles.view}
        onPress={() =>
          navigation.navigate("PostCreate", { postType: "missings" })
        }
      >
        <Icon
          size={80}
          name="account"
          iconColor={colors.secondary}
          backgroundColor={colors.white}
        />
        <AppText style2={styles.text}>Disparition</AppText>
      </Pressable>
      <Pressable
        style={styles.view}
        onPress={() =>
          navigation.navigate("PostCreate", { postType: "students" })
        }
      >
        <Icon
          size={80}
          name="school"
          iconColor={colors.secondary}
          backgroundColor={colors.white}
        />
        <AppText style2={styles.text}>Etudiants</AppText>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: colors.white,
  },
  view: {
    backgroundColor: colors.primary,
    width: "40%",
    height: "20%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
})
