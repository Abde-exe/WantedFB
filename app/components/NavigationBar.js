import React from "react"
import { StyleSheet, Text, View } from "react-native"
import colors from "../../config/colors"
import IconButton from "./IconButton"
import { useNavigation } from "@react-navigation/core"

const NavigationBar = () => {
  const navigation = useNavigation()

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingVertical: 8,
      }}
    >
      <IconButton
        onPress={() => navigation.goBack()}
        name="arrow-left"
        size={30}
        color={colors.medium}
      />
      <IconButton
        onPress={() => navigation.navigate("Home")}
        name="close-circle"
        size={30}
        color={colors.medium}
      />
    </View>
  )
}

export default NavigationBar

const styles = StyleSheet.create({})
