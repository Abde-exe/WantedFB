import React from "react"
import { Image, StyleSheet, View, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/core"
import colors from "../../config/colors"
import AppText from "./AppText"
import routes from "../navigation/routes"
const Card = ({
  title = "Nom Prenom",
  subTitle = "23 ans",
  Description = "Disparu à Paris le 14/03/2020",
  image = require("../assets/messi.jpg"),
}) => {
  const navigation = useNavigation()
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate(routes.CARD_DETAIL, {
          image: require("../assets/messi.jpg"),
        })
      }
    >
      <Image style={styles.image} source={image} />
      <View style={styles.details}>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 5,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <AppText style2={styles.title}>{title}</AppText>
          <AppText style2={styles.title}>{subTitle}</AppText>
        </View>
        <AppText style2={styles.description}>{Description}</AppText>
      </View>
    </Pressable>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
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
    width: "40%",
    height: 100,
    resizeMode: "cover",
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
