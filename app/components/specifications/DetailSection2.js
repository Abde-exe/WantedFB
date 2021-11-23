import React from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../../config/colors"
import AppText from "../AppText"
import DetailsText from "../DetailsText"
import Separator from "../Separator"

const DetailSection2 = ({ post }) => {
  const { name, age, location } = post
  const { type, domain, length, place } = post
  const { title, description } = post
  return (
    <View>
      <AppText
        style2={{
          textAlign: "center",
          fontSize: 20,
          width: "90%",
          alignSelf: "center",
          color: colors.danger,
          marginTop: 64,
        }}
      >
        {title}
      </AppText>
      <View style={{ padding: 20 }}>
        <AppText style={styles.sectionTitle}>Identité</AppText>
        <View style={styles.section}>
          <DetailsText text={name} subText={"Nom"} />
          {age != "" ? (
            <DetailsText text={age} subText={"Age"} other={" ans"} />
          ) : null}
          {location != "" ? (
            <DetailsText text={location} subText={"Localisation"} />
          ) : null}
        </View>
        <Separator />
        <AppText style={styles.sectionTitle}>Poste</AppText>
        <View style={styles.section}>
          {type != "" ? <DetailsText text={type} subText={"Type"} /> : null}
          {domain != "" ? (
            <DetailsText text={domain} subText={"Domaine"} />
          ) : null}
          {length != "" ? (
            <DetailsText text={length} subText={"Durée"} />
          ) : null}
          {place != "" ? <DetailsText text={place} subText={"Lieu"} /> : null}
        </View>
        <Separator />

        <AppText style={styles.sectionTitle}>Détails</AppText>
        <View style={styles.section}>
          {description != "" ? (
            <DetailsText text={description} subText={"Description"} />
          ) : null}
        </View>
      </View>
    </View>
  )
}

export default DetailSection2
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
