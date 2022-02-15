import React from "react"
import { Image, Text, View, StyleSheet } from "react-native"
import DetailsText2 from "../DetailsText2"
import dayjs from "dayjs"
import colors from "../../../config/colors"

const SharingMissings = ({ post }) => {
  if (post) {
    const {
      images,
      title,
      name,
      description,
      age,
      date,
      location,
      race,
      sexe,
      other,
    } = post
    console.log(`date`, post)
    var date2 = ""
    date.seconds ? (date2 = date.toDate()) : (date2 = date)
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          {date2 ? (
            <Text style={styles.title}>
              {`Disparu(e) depuis le ${dayjs(date2).format("D/M")} à `}
              {location ? (
                <Text style={styles.title}>{location.name.split(",")[0]}</Text>
              ) : null}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            //borderWidth: 2,
            borderColor: "yellow",
            flexDirection: "row",
            height: "40%",
          }}
        >
          {images.length && (
            <Image
              source={{
                uri: post.images[0],
              }}
              style={{
                width: "50%",
                resizeMode: "cover",
                borderWidth: 2,
                borderColor: colors.danger,
              }}
            />
          )}

          <View
            style={{
              //borderWidth: 1,
              borderColor: "red",
              width: "50%",
              height: "100%",
            }}
          >
            {name ? <Text style={styles.text}>{name}</Text> : null}
            {age ? <DetailsText2 row text={age} subText="Age :" /> : null}
            {sexe ? <DetailsText2 row text={sexe} subText="Sexe :" /> : null}
            {race ? <DetailsText2 row text={race} subText="Race :" /> : null}
            {other ? (
              <DetailsText2 row text={other} subText="Signe Particulier :" />
            ) : null}
          </View>
        </View>
        <View
          style={{
            //borderWidth: 1,
            borderColor: "blue",
            width: "100%",
            height: "40%",
          }}
        >
          {title ? <Text style={styles.text}>{title}</Text> : null}
          {description ? (
            <DetailsText2
              style={styles.subText}
              text={description.substring(0, 240)}
            />
          ) : null}
        </View>
      </View>
    )
  }
}

export default SharingMissings

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    //borderWidth: 1,
    padding: 8,
    margin: 8,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    color: colors.danger,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 4,
  },
  subText: {
    fontSize: 18,
    marginLeft: 4,
    marginTop: 4,
  },
})
