import React from "react"
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"

import colors from "../../config/colors"
import AppText from "./AppText"

import AppButton from "./AppButton"

export default function ProfileComponent({
  title,
  subTitle,
  image,
  onPress,
  renderRightActions,
  buttonTitle,
  buttonAction,
  ImageComponent,
  style2,
}) {
  return (
    <View>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={[styles.container, style2]}>
            {ImageComponent}
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <View style={{ marginLeft: 10, alignItems: "flex-start", flex: 1 }}>
              <AppText style2={styles.title}>{title}</AppText>
              {subTitle && (
                <AppText style2={styles.subTitle}>{subTitle}</AppText>
              )}
            </View>
            <View style={{ alignSelf: "flex-end", width: "30%" }}>
              <AppButton title={buttonTitle} onPress={buttonAction} />
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignItems: "center",
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
    fontSize: 15,
  },
})
