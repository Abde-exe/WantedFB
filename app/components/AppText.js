import React from "react"
import { Text } from "react-native"
import global from "../../config/styles"

const AppText = ({ children, style2, ...otherProps }) => {
  return (
    <Text style={[global.text, style2]} {...otherProps}>
      {children}
    </Text>
  )
}
export default AppText
