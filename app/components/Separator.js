import React from "react"
import { View } from "react-native"
import colors from "../../config/colors"

const Separator = () => {
  return (
    <View
      style={{
        marginVertical: 16,
        height: 0.5,
        width: "100%",
        backgroundColor: colors.light,
      }}
    ></View>
  )
}

export default Separator
