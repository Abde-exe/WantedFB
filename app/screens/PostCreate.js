import React, { useState, useRef } from "react"
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
} from "react-native"
import { LogBox } from "react-native"
LogBox.ignoreLogs(["Setting a timer for a long period of time"])
import ProgressBar from "react-native-progress/Bar"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import "react-native-get-random-values"
import AppText from "../components/AppText"
import Screen from "../components/Screen"
import colors from "../../config/colors"
import IconButton from "../components/IconButton"
import {
  Animals,
  Missings,
  Students,
  Objects
} from "../components/specifications/SpecificForms"

const PostCreate = ({ navigation, route }) => {
  const scrollView = useRef()
  const [modalVisible, setModalVisible] = useState(false)
  //manage progress bar and steps
  const [step, setStep] = useState(0)
  const changeProgress = (i) => {
    setStep(step + i)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : null}>
      <SafeAreaView>
        <View style={styles.container}>
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
          {route.params.type === "missings" ? (
            <Missings changeProgress={changeProgress} />
          ) : route.params.type === "students" ? (
            <Students changeProgress={changeProgress} />
          ) :route.params.type === "animals" ?  (
            <Animals changeProgress={changeProgress} />
          ):<Objects changeProgress={changeProgress}/>}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default PostCreate

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
})
