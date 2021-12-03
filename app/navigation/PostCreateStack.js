import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PostCreate from "../screens/PostCreate"
import SharingView from "../screens/SharingView"
import colors from "../../config/colors"
import { View, StyleSheet, Pressable } from "react-native"
import AppText from "../components/AppText"
import Icon from "../components/Icon"
import Screen from "../components/Screen"

const Stack = createStackNavigator()

const PostCreateStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="card"
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
    <Screen>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <AppText style={{ fontSize: 32, marginLeft: 16 }}>Nouveau post</AppText>
        <AppText> choisir le type de post</AppText>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
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
              name="account-child"
              iconColor={colors.secondary}
              backgroundColor="white"
            />
            <AppText style2={styles.text}>Disparitions</AppText>
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
              backgroundColor="white"
            />
            <AppText style2={styles.text}>Etudiants</AppText>
          </Pressable>
        </View>
      </View>
    </Screen>
  )
}
const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    color: colors.white,
    fontSize: 32,
    marginLeft: 8,
    alignSelf: "flex-start",
  },
  text: {
    textAlign: "center",
    color: colors.white,
  },
  view: {
    backgroundColor: colors.primary,
    width: "50%",
    height: "25%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
})
