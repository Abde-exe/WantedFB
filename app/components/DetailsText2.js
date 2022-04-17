import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";

const DetailsText2 = ({ text, subText, other = "" }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 8,
        marginTop: 8,
        flexWrap: "wrap",
      }}
    >
      <Text style={styles.subText}>{subText}</Text>
      <Text style={styles.text}>{`${text}${other}`}</Text>
    </View>
  );
};

export default DetailsText2;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "400",
    marginLeft: 2,
    textAlign: "left",
  },
  subText: {
    fontSize: 14,
    color: colors.medium,
  },
});
