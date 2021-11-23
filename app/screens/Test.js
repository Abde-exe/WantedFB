import React, { useEffect } from "react"
import { StyleSheet, Button, View } from "react-native"
import LottieView from "lottie-react-native"
import navigationTheme from "../navigation/navigationTheme"

const Test = ({ navigation, post }) => {
  console.log(`post`, post)
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: 2000,
          height: 2000,
        }}
        loop={false}
        source={require("../../assets/done.json")}
        onAnimationFinish={() => navigation.navigate("SharingView", post)}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
    </View>
  )
}

export default Test

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
})
