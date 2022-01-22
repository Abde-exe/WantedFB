import React from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../../config/colors"
import AppText from "../AppText"
import DetailsText from "../DetailsText"
import Separator from "../Separator"

const StudentsSection = ({ post }) => {
  const { type, domain, length, place } = post
  const { title, description, name } = post
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
        {title}
      </AppText>
      {description && <AppText>{description} </AppText>}
      <View style={{ padding: 20 }}>
        <AppText style={styles.sectionTitle}>Identité</AppText>
        <View style={styles.section}>
          <DetailsText text={name} subText={"Nom"} />
        </View>
        <Separator />
        <AppText style={styles.sectionTitle}>Détails</AppText>
        <View style={styles.section}>
          {type && <DetailsText text={type} subText={"Type"} />}
          {domain && <DetailsText text={domain} subText={"Domaine"} />}
          {length && <DetailsText text={length} subText={"Durée"} />}
          {place && <DetailsText text={place} subText={"Lieu"} />}
        </View>
        <Separator />

        <AppText style={styles.sectionTitle}>Contact</AppText>
        <View style={styles.section}></View>
      </View>
    </View>
  )
}

export default StudentsSection
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
