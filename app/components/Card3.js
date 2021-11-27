import React, { useEffect, useState } from "react"
import { Image, StyleSheet, View, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/core"
import dayjs from "dayjs"
import "dayjs/locale/fr"

import colors from "../../config/colors"
import AppText from "./AppText"
import IconButton from "./IconButton"

const Card3 = ({ post, onIconPress }) => {
  //state
  const [image, setImage] = useState()
  const navigation = useNavigation()
  const { id, title, age, type, images, createdAt, place } = post

  useEffect(() => {
    if (images) {
      setImage(images[0])
    }
  }, [post])

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("PostDetail", post)}
    >
      <View
        style={{
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
      >
        {images[0] && (
          <Image
            style={styles.image}
            source={{
              uri: images[0],
            }}
          />
        )}
      </View>
      <View style={styles.details}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <AppText style2={styles.title}>{title}</AppText>
          <IconButton
            name="close-circle"
            size={24}
            color={colors.danger}
            onPress={() => onIconPress()}
          />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <AppText style2={styles.description}>
            {dayjs(createdAt.toDate()).format("DD/MM/YYYY")}
          </AppText>
          <AppText style2={styles.description}>{type}</AppText>
        </View>
      </View>
    </Pressable>
  )
}

export default Card3

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderWidth: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.black,
  },

  description: {
    fontSize: 10,
    fontWeight: "normal",
    opacity: 0.6,
    color: "red",
  },
})