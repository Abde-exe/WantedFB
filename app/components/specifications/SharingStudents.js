import React from "react"
import { Image, Text, View, StyleSheet } from "react-native"
import DetailsText2 from "../DetailsText2"
import colors from "../../../config/colors"

const SharingStudents = ({ post }) => {
  if (post) {
    const {
      name,
      type,
      domain,
      length,
      location,
      title,
      description,
      images,
    } = post
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>
            {`Recherche ${type} à `}
            {location.name && (
              <Text style={styles.title}>{location.name.split(",")[0]}</Text>
            )}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: "40%",
          }}
        >
          {images && (
            <Image
              source={{
                uri: images[0]
                  ? images[0]
                  : "https://firebasestorage.googleapis.com/v0/b/wanted-316010.appspot.com/o/assets%2Fpp.png?alt=media&token=f564d417-d3ce-48f8-a211-3589664c0a03",
              }}
              style={{
                width: "50%",
                resizeMode: "cover",
              }}
            />
          )}

          <View
            style={{
              //borderWidth: 1,
              width: "50%",
              height: "100%",
            }}
          >
            {name && <Text style={styles.text}>{name}</Text>}
            {location.name != "" ? (
              <DetailsText2
                row
                text={location.name.split(",")[0]}
                subText="Lieu :"
              />
            ) : null}
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
    textAlign: "center",
    fontSize: 20,
    color: colors.danger,
    paddingHorizontal: 8,
    marginBottom: 8,
    width: "100%",
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
