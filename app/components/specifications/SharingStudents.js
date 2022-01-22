import React from "react"
import { Image, Text, View, StyleSheet } from "react-native"
import DetailsText2 from "../DetailsText2"
import dayjs from "dayjs"
import colors from "../../../config/colors"

const SharingStudents = ({ post }) => {
  if (post) {
    const {
      name,
      type,
      domain,
      length,
      place,
      title,
      description,
      images,
    } = post
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{`Recherche ${type} à`}</Text>
        </View>
        <View
          style={{
            //borderWidth: 2,
            borderColor: "yellow",
            flexDirection: "row",
            height: "40%",
          }}
        >
          {images && (
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
            {name && <Text style={styles.text}>{name}</Text>}
            {place && <DetailsText2 row text={place} subText="Lieu :" />}
            {domain && <DetailsText2 row text={domain} subText="Domaine :" />}
            {length && <DetailsText2 row text={length} subText="Durée :" />}
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
          {title && (
            <Text style={[styles.text, { marginTop: 16 }]}>{title}</Text>
          )}
          {description && (
            <DetailsText2
              style={styles.subText}
              text={description.substring(0, 240)}
            ></DetailsText2>
          )}
        </View>
      </View>
    )
  }
}

export default SharingStudents

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
  },
  subText: {
    fontSize: 18,
    marginLeft: 4,
    marginTop: 4,
  },
})
