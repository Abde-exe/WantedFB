import React from "react"
import { StyleSheet, View } from "react-native"
import LottieView from "lottie-react-native"

const DoneAnimation = ({ navigation, post }) => {
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
        onAnimationFinish={() => navigation.navigate("FeedStack")}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
    </View>
  )
}

export default DoneAnimation

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
