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
import * as Yup from "yup"
import ProgressBar from "react-native-progress/Bar"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import ActivityIndicator from "../components/ActivityIndicator"
import "react-native-get-random-values"
import AppText from "../components/AppText"
import { AppFormField } from "../components/forms"
import MultiForm from "../components/forms/MultiForm"
import Screen from "../components/Screen"
import colors from "../../config/colors"
import DateInput from "../components/DateInput"
import ImagePicker from "../components/forms/ImagePicker"
//import LocalisationSearchBar from "../components/forms/LocalisationSearchBar"
import AppButton from "../components/AppButton"

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "Sélectionner au moins 1 image"),
  name: Yup.string().required().min(3, "Entrer un nom").label("Nom"),
  age: Yup.number().min(0).max(120).label("Age"),
  date: Yup.date().required().label("Date"),
  location: Yup.string().required().label("Localisation"),

  corpulence: Yup.string().label("Corpulence"),
  height: Yup.number().min(100).max(220).label("Taille"),
  hair: Yup.string().label("Cheveux"),
  eyes: Yup.string().label("Yeux"),
  outfit: Yup.string().label("Tenue"),
  other: Yup.string().label("Autre"),

  tel: Yup.string().required().label("Téléphone"),
  email: Yup.string().email().label("Email"),
})
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
const PostEdit = ({ navigation }) => {
  const scrollView = useRef()

  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  //progress bar and steps gestion
  const [step, setStep] = useState(0)
  const changeProgress = (i) => {
    setStep(step + i)
  }

  //post data
  const handleSubmit = async (post) => {
    console.log(`post`, post)
    setLoading(true)

    if (!user) {
      console.error("User not found")
      return
    }
    //parse age to number to fit in the DB model
    post.age = parseInt(post.age)
    post.height = parseInt(post.height)

    //save every images of the post in Storage and return a key for each
    var imageKeys = []
    const max = post.images.length
    for (let i = 0; i < max; i++) {
      const formattedImg = await uploadImage(post.images[i])
      imageKeys.push(formattedImg)
    }
    ///////

    //save the post with all formatted fields

    navigation.navigate("FeedNavigator")
    setStep(0)
    setLoading(false)
  }
  //upload images in Storage
  const uploadImage = async (image) => {
    if (!image) return
    try {
      return fileKey
    } catch (err) {
      console.log("(PostEdit.uploadImage)Error uploading file:", err)
      return null
    }
  }
  return (
    <Screen>
      <View style={styles.container}>
        {
          //<ActivityIndicator visible={loading}/>
        }
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={{
            marginLeft: 16,
            marginVertical: 8,
          }}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={30}
            color={colors.medium}
          />
        </TouchableOpacity>
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
          keyboardShouldPersistTaps="handled"
          ref={scrollView}
          onContentSizeChange={() =>
            scrollView.current.scrollTo({ x: 0, y: 0, animated: true })
          }
        >
          <MultiForm
            validationSchema={validationSchema}
            progress={changeProgress}
            initialValues={{
              images: [],
              name: "",
              age: "",
              date: "",
              location: "",
              corpulence: "",
              height: "",
              hair: "",
              eyes: "",
              outfit: "",
              other: "",
              email: "",
              tel: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values)
              console.log(`values`, values)
              // resetForm({ values: initialValues })
            }}
          >
            {
              //Form 1
            }
            <View>
              <AppText style2={styles.title}>Identité et Signalement</AppText>
              <AppText style2={{ marginLeft: 16 }}>
                Remplissez le plus de champs possible.
              </AppText>
              <AppButton onPress={() => setModalVisible(true)} />
              <ImagePicker name="images" />

              <AppFormField
                name="name"
                placeholder="Nom, prénom..."
                icon="account"
              />
              <AppFormField
                name="age"
                keyboardType="numeric"
                maxLength={3}
                placeholder="Age"
                width={"22%"}
              />
              <DateInput
                name="date"
                placeholder="Date de disparition"
                icon="calendar-today"
              />
              <AppFormField
                placeholder="Location before missing"
                name="location"
                icon="map-marker"
              />
              {/*
              <LocationSearchBar
                placeholder="Location before missing"
                name="location"
              />
              */}
            </View>
            {
              //Form 2
            }
            <View>
              <AppText style2={styles.title}>Description physique</AppText>
              <AppFormField
                name="corpulence"
                placeholder="Corpulence"
                style2={{ width: "75%" }}
              />
              <AppFormField
                name="height"
                keyboardType="numeric"
                maxLength={3}
                placeholder="Taille (cm)"
                width={"30%"}
              />

              <AppFormField name="hair" placeholder="Cheveux" />
              <AppFormField name="eyes" placeholder="Yeux" />
              <AppFormField
                name="outfit"
                placeholder="Tenue vestimentaire"
                multiline
                numberOfLines={4}
              />
              <AppFormField
                name="other"
                placeholder="Signe particulier, autre..."
                multiline
                numberOfLines={4}
              />
            </View>
            {
              //Form 3
            }
            <View>
              <AppText style2={styles.title}>Contact</AppText>

              <AppFormField
                width={"40%"}
                name="tel"
                placeholder="Téléphone"
                keyboardType="numeric"
                maxLength={10}
              />

              <AppFormField name="email" placeholder="Email" />
            </View>
          </MultiForm>
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
      </Modal>
    </Screen>
  )
}

export default PostEdit

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  title: {
    color: colors.secondary,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "600",
    marginVertical: 30,
  },
})
