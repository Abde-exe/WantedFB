import React, { useState, useRef } from "react"
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native"
import { LogBox } from "react-native"
LogBox.ignoreLogs(["Setting a timer for a long period of time"])
import ProgressBar from "react-native-progress/Bar"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import AppText from "../components/AppText"
import Screen from "../components/Screen"
import colors from "../../config/colors"
import IconButton from "../components/IconButton"
import { Missings, Students } from "../components/specifications/SpecificForms"

const PostEdit = ({ navigation, route }) => {
  const scrollView = useRef()
  const post = route.params
  //manage progress bar and steps
  const [step, setStep] = useState(0)
  const changeProgress = (i) => {
    setStep(step + i)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : null}>
      <SafeAreaView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }}
          ></View>
          <ProgressBar
            animated={true}
            animationType="spring"
            width={Dimensions.get("window").width}
            progress={step}
            color={colors.secondary}
            unfilledColor={colors.light}
            borderColor={colors.background}
            height={8}
            borderRadius={0}
            useNativeDriver={true}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ref={scrollView}
          onContentSizeChange={() =>
            scrollView.current.scrollTo({ x: 0, y: 0, animated: true })
          }
        >
          {post.postType == "missings" ? (
            <Missings changeProgress={changeProgress} post={post} edit={true} />
          ) : (
            <Students changeProgress={changeProgress} post={post} edit={true} />
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default PostEdit

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
})
