import React, { useEffect, useState } from "react"
import { Image, StyleSheet, View, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/core"
import dayjs from "dayjs"
import "dayjs/locale/fr"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
dayjs.locale("fr")

import colors from "../../config/colors"
import AppText from "./AppText"

const Card2 = ({ post }) => {
  //state
  const [image, setImage] = useState()
  const navigation = useNavigation()
  const { title, state, images, createdAt } = post

  useEffect(() => {
    if (images) {
      setImage(images[0])
    }
  }, [post])
  return (
    <Pressable
      style={(args) => {
        if (args.pressed) {
          return [
            styles.card,
            {
              opacity: 0.8,
            },
          ]
        }
        return [styles.card]
      }}
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
        {image ? (
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        ) : null}
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
          <AppText style2={styles.title} numberOfLines={1}>
            {title}
          </AppText>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <AppText style2={styles.description} numberOfLines={1}>
            {dayjs(createdAt.toDate()).fromNow()}
          </AppText>
          <AppText style2={[styles.description, { textAlign: "right" }]}>
            {state}
          </AppText>
        </View>
      </View>
    </Pressable>
  )
}

export default Card2

const styles = StyleSheet.create({
  card: {
    flexWrap: "nowrap",
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 203,
    width: "45%",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  details: {
    flex: 1,
    height: 20,
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },

  description: {
    fontSize: 12,
    fontWeight: "normal",
    color: colors.secondary,
    flexWrap: "wrap",
    flex: 1,
  },
})
