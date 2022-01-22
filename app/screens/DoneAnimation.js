import React from "react"
import { StyleSheet, View } from "react-native"
import LottieView from "lottie-react-native"
import { StackActions } from "@react-navigation/native"
const DoneAnimation = ({ navigation, route }) => {
  console.log(`route.params.post`, route.params.values)

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: 100,
          height: 100,
        }}
        loop={false}
        source={require("../../assets/done.json")}
        onAnimationFinish={() => {
          navigation.navigate("SharingView", {
            params: { post: route.params.values },
          })
        }}
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
