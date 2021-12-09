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
        onAnimationFinish={(() => navigation.navigate("SharingView"), { post })}
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
