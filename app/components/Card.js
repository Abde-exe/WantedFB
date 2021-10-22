import React, { useEffect, useState } from "react"
import { Image, StyleSheet, View, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/core"
import moment from "moment"
import "moment/locale/fr"
moment.locale("fr")

import colors from "../../config/colors"
import AppText from "./AppText"

const Card = ({ item }) => {
  //state
  const [image, setImage] = useState()
  const navigation = useNavigation()
  const { id, name, age, images, location, createdAt } = item

  useEffect(() => {
    if (images) {
      setImage(images)
    }
  }, [item])
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("CardDetail", {
          item: item,
        })
      }
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
          <AppText style2={styles.title}>{name}</AppText>
          <AppText style2={styles.title}>{age}</AppText>
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
            {moment(createdAt).startOf("day").fromNow()}
          </AppText>
          <AppText style2={styles.description}>DISPARITION</AppText>
        </View>
      </View>
    </Pressable>
  )
}

export default Card

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
