import React from "react"
import dayjs from "dayjs"
import "dayjs/locale/fr"
dayjs.locale("fr")
import { StyleSheet, View } from "react-native"
import colors from "../../../config/colors"
import AppText from "../AppText"
import DetailsText from "../DetailsText"
import Separator from "../Separator"

const DetailSection = ({ post }) => {
  const { name, age, date, location } = post
  const { corpulence, height, hair, eyes, outfit, other } = post
  const { tel, email } = post
  return (
    <View>
      <AppText
        style2={{
          textAlign: "center",
          fontSize: 20,
          width: "90%",
          alignSelf: "center",
          color: colors.danger,
        }}
      >
        {date && `Disparu(e) le ${dayjs(date.toDate()).format("D/M")}`}
        {location && ` à ${location}`}
      </AppText>
      <View style={{ padding: 20 }}>
        <AppText style={styles.sectionTitle}>Identité</AppText>
        <View style={styles.section}>
          <DetailsText text={name} subText={"Nom"} />
          {age != "" ? (
            <DetailsText text={age} subText={"Age"} other={" ans"} />
          ) : null}
          {location != "" ? (
            <DetailsText text={location} subText={"Lieu de disparition"} />
          ) : null}
        </View>
        <Separator />
        <AppText style={styles.sectionTitle}>Description physique</AppText>
        <View style={styles.section}>
          {corpulence != "" ? (
            <DetailsText text={corpulence} subText={"Corpulence"} />
          ) : null}
          {height != "" ? (
            <DetailsText text={height} subText={"Taille"} other=" cm" />
          ) : null}
          {hair != "" ? <DetailsText text={hair} subText={"Cheveux"} /> : null}
          {eyes != "" ? <DetailsText text={eyes} subText={"Yeux"} /> : null}
          {outfit != "" ? (
            <DetailsText text={outfit} subText={"Tenue"} />
          ) : null}
          {other != "" ? <DetailsText text={other} subText={"Autre"} /> : null}
        </View>
        <Separator />

        <AppText style={styles.sectionTitle}>Contact</AppText>
        <View style={styles.section}>
          {tel != "" ? <DetailsText text={tel} subText={"Téléphone"} /> : null}
          {email != "" ? <DetailsText text={email} subText={"Email"} /> : null}
        </View>
      </View>
    </View>
  )
}

export default DetailSection
const styles = StyleSheet.create({
  title: {
    marginBottom: 7,
    color: colors.secondary,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 24,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "left",
  },
  section: {
    marginBottom: 24,
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
})
