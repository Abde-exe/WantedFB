import React, { useState, useRef } from "react"
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
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
import { Missings, Students } from "../components/specifications/SpecificForms"

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Disparition",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Enlèvement",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Fuite",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Ne sais pas",
    value: 4,
  },
]

const PostCreate = ({ navigation, route }) => {
  const scrollView = useRef()

  const [modalVisible, setModalVisible] = useState(false)
  //manage progress bar and steps
  const [step, setStep] = useState(0)
  const changeProgress = (i) => {
    setStep(step + i)
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 8,
          }}
        >
          <IconButton
            onPress={() => navigation.goBack()}
            name="arrow-left"
            size={30}
            color={colors.medium}
          />
          <IconButton
            onPress={() => navigation.navigate("FeedStack")}
            name="close-circle"
            size={30}
            color={colors.medium}
          />
        </View>
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ref={scrollView}
          onContentSizeChange={() =>
            scrollView.current.scrollTo({ x: 0, y: 0, animated: true })
          }
        >
          {route.params.postType == "missings" ? (
            <Missings changeProgress={changeProgress} />
          ) : (
            <Students changeProgress={changeProgress} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "30%",
            backgroundColor: colors.medium,
            borderTopStartRadius: 25,
            borderTopEndRadius: 25,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false)
            }}
            style={{
              marginLeft: 16,
              marginVertical: 8,
            }}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.value.toString()}
            numColumns={1}
            renderItem={({ item }) => <AppText>{item.label}</AppText>}
          />
        </View>
        )
      </Modal>
    </Screen>
  )
}

export default PostCreate

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
})
