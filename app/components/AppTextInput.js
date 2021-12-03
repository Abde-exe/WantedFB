import React from "react"
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import defaultStyles from "../../config/styles"
import colors from "../../config/colors"
import IconButton from "./IconButton"
export default function AppTextInput({
  style2,
  icon,
  rightIcon,
  OnPressRightIcon,
  width = Dimensions.get("window").width - 32,
  ...otherProps
}) {
  return (
    <View style={[styles.container, style2, { width: width }]}>
      {icon ? (
        <IconButton
          name={icon}
          size={20}
          color={defaultStyles.colors.black}
          style2={{
            marginRight: 5,
          }}
        />
      ) : null}
      <TextInput
        autoCorrect={false}
        style={[defaultStyles.text, styles.textInput, { width: width }]}
        {...otherProps}
      />
      {rightIcon ? (
        <IconButton
          onPress={OnPressRightIcon}
          name={rightIcon}
          size={20}
          color={defaultStyles.colors.black}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  textInput: {
    flex: 1,
  },
})
