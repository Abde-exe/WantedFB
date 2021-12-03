import React from "react"
import { StyleSheet, View, Image, TouchableHighlight } from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../../../config/colors"
import AppText from "../AppText"

export default function ListItem({
  title,
  subTitle,
  image,
  onPress,
  renderRightActions,
  ImageComponent,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.medium} onPress={onPress}>
        <View style={styles.container}>
          {ImageComponent}
          {image && <Image source={image} style={styles.image} />}
          <View style={{ marginLeft: 10, alignItems: "flex-start", flex: 1 }}>
            <AppText style2={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style2={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={25}
            color={colors.medium}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderTopWidth: 2,
    borderColor: colors.light,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontWeight: "700",
    color: colors.black,
  },
  subTitle: {
    color: colors.black,
  },
})
