import React from "react"
import dayjs from "dayjs"
import "dayjs/locale/fr"
dayjs.locale("fr")
import { StyleSheet, View } from "react-native"
import colors from "../../../config/colors"
import AppText from "../AppText"
import DetailsText from "../DetailsText"
import Separator from "../Separator"
import IconButton from "../IconButton"
import { openURL } from "expo-linking"

const AnimalsSection = ({ post }) => {
  const { title, age, date, location, description, name } = post
  const { sexe, race, other } = post
  const { tel, email, facebook, instagram, snapchat, twitter } = post
  var date2 = new Date(1970, 0, 1)
  date2.setSeconds(date.seconds)

  const openSocial=(media)=>{
switch(media){
  case "instagram":
    openURL(`https://www.instagram.com/${instagram}`)
    break;
  case "twitter":
    openURL(`https://www.twitter.com/${twitter}`)
    break;
  case  "facebook":
    openURL(`https://www.facebook.com/${facebook}`)
    break;
    case  "snapchat":
    openURL(`https://www.snapchat.com/add/${snapchat}`)
    break;
}
  }
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
          {race ? <DetailsText text={race} subText={"Race"} /> : null}
          {other ? <DetailsText text={other} subText={"Autre"} /> : null}
        </View>
        <Separator />

        <AppText style={styles.sectionTitle}>Contact</AppText>
        <View style={styles.section}>
          {tel ? <DetailsText text={tel} subText={"Téléphone"} /> : null}
          {email ? <DetailsText text={email} subText={"Email"} /> : null}
          <View style={{flexDirection:"row", width:'100%',justifyContent:'space-around',paddingVertical:16}}>

          {facebook ? <IconButton name={"facebook"} size={32} onPress={()=>openSocial("facebook")}/> : null}
          {instagram ? <IconButton name={"instagram"} size={32}onPress={()=>openSocial("instagram")}/> : null}
          {twitter ? <IconButton name={"twitter"} size={32}onPress={()=>openSocial("twitter")}/> : null}
          {snapchat ? <IconButton name={"snapchat"} size={32}onPress={()=>openSocial("snapchat")}/> : null}
          </View>
          
          
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
