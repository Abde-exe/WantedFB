import React from "react"
import LottiView from "lottie-react-native"

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null
  return (
    <LottiView autoPlay loop source={require("../../assets/loader.json")} />
  )
}

export default ActivityIndicator
