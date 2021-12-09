import React from "react"
import { Pressable, StyleSheet } from "react-native"
import Icon from "./Icon"

const FloatButton = ({ icon, color, onPress }) => {
  return (
    <Pressable
      style={(args) => {
        if (args.pressed) {
          return [
            styles.container,
            {
              opacity: 0.8,
            },
          ]
        }
        return [styles.container]
      }}
      onPress={onPress}
    >
      <Icon
        name={icon}
        backgroundColor={color}
        size={64}
        style2={styles.icon}
      />
    </Pressable>
  )
}

export default FloatButton

const styles = StyleSheet.create({
  container: { position: "absolute", bottom: 80, right: 20, zIndex: 100 },
  icon: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})
