import React from "react"
import dayjs from "dayjs"
import "dayjs/locale/fr"
dayjs.locale("fr")
import { StyleSheet, View } from "react-native"
import colors from "../../../config/colors"
import AppText from "../AppText"
import DetailsText from "../DetailsText"
import Separator from "../Separator"

const ObjectsSection = ({ post }) => {
  const { title, state, date, location, description } = post
  const { tel, email } = post
  var date2 = new Date(1970, 0, 1)
  date2.setSeconds(date.seconds)

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
        {date && `${state} le ${dayjs(date2).format("D/M")}`}
        {location.name && ` à ${location.name}`}
      </AppText>
      {title ? (
        <AppText
          style2={{
            marginHorizontal: 16,
            marginVertical: 16,
          }}
        >
          {title}
        </AppText>
      ) : null}
      <View style={{ padding: 20 }}>
        <AppText style={styles.sectionTitle}>Signalement</AppText>
        <View style={styles.section}>
          {location ? (
            <DetailsText text={location.name} subText={"Dernière localisation"} />
          ) : null}
        </View>
        <Separator />
        <AppText style={styles.sectionTitle}>Description</AppText>
        <View style={styles.section}>
        {description ? (
        <AppText
          style2={{
            marginHorizontal: 16,
            marginVertical: 16,
          }}
        >
          {description}
        </AppText>
      ) : null}
        </View>
        <Separator />

        <AppText style={styles.sectionTitle}>Contact</AppText>
        <View style={styles.section}>
          {tel ? <DetailsText text={tel} subText={"Téléphone"} /> : null}
          {email ? <DetailsText text={email} subText={"Email"} /> : null}
        </View>
      </View>
    </View>
  )
}

export default ObjectsSection
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
    marginBottom: 16,
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
})
