import React from "react"
import { Image, Text, View, StyleSheet } from "react-native"
import DetailsText2 from "../DetailsText2"
import dayjs from "dayjs"
import colors from "../../../config/colors"

const SharingObjects = ({ post }) => {
  if (post) {
    const {
      images,
      title,
      description,
      date,
      state,
      location,
    } = post
    var date2 = ""
    date.seconds ? (date2 = date.toDate()) : (date2 = date)
    return (
      <View style={{height:"95%",width:'100%',alignItems:'center'}}>
        <View style={{ flexDirection: "row" }}>
          {date2 && (
            <Text style={styles.title}>
              {`${state} depuis le ${dayjs(date2).format("D/M")} à `}
              {location.name && (
                <Text style={styles.title}>{location.name.split(",")[0]}</Text>
              )}
            </Text>
          )}
        </View>
        <View
          style={{
            height: "50%",
            width:"50%",
         
          }}
        >
          {images && (
            <Image
              source={{
                uri: post.images[0],
              }}
              style={{
                width: "100%",
                height:"100%",
                resizeMode: "contain",
                // borderColor: colors.danger,
              }}
            />
          )}

          
        </View>
        {/* Description section */}
        <View
          style={{
            //borderWidth: 1,
            borderColor: "blue",
            minHeight:'20%'
          }}
        >
          {title ? <Text style={styles.text}>{title}</Text> : null}
          {description ? (
            <DetailsText2
              style={styles.subText}
              text={description.substring(0, 240)}
            ></DetailsText2>
          ) : null}
        </View>
      </View>
    )
  }
}

export default SharingObjects

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