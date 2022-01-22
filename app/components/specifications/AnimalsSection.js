import React from "react"
import dayjs from "dayjs"
import "dayjs/locale/fr"
dayjs.locale("fr")
import { StyleSheet, View } from "react-native"
import colors from "../../../config/colors"
import AppText from "../AppText"
import DetailsText from "../DetailsText"
import Separator from "../Separator"

const AnimalsSection = ({ post }) => {
  const { title, age, date, location, description, name } = post
  const { sexe, race, other } = post
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
        {date && `Disparu(e) le ${dayjs(date2).format("D/M")}`}
        {location.name && ` à ${location.name}`}
      </AppText>
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

      <View style={{ padding: 20 }}>
        <AppText style={styles.sectionTitle}>Signalement</AppText>
        <View style={styles.section}>
          <DetailsText text={name} subText={"Nom"} />
          {age && <DetailsText text={age} subText={"Age"} other={" ans"} />}
          {location.name ? (
            <DetailsText text={location.name} subText={"Lieu de disparition"} />
          ) : null}
        </View>
        <Separator />
        <AppText style={styles.sectionTitle}>Description</AppText>
        <View style={styles.section}>
          {sexe ? <DetailsText text={sexe} subText={"Sexe"} /> : null}
          {race ? (
            <DetailsText text={race} subText={"Race"} other=" cm" />
          ) : null}
          {other ? <DetailsText text={other} subText={"Autre"} /> : null}
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

export default AnimalsSection
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
