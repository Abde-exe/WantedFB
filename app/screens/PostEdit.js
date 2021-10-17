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
import * as Yup from "yup"
import ProgressBar from "react-native-progress/Bar"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { v4 as uuidv4 } from "uuid"
import firebase from "firebase"
require("firebase/firestore")
require("firebase/storage")

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
  date: Yup.date().label("Date"),
  location: Yup.string().label("Localisation"),

  corpulence: Yup.string().label("Corpulence"),
  height: Yup.number().min(100).max(220).label("Taille"),
  hair: Yup.string().label("Cheveux"),
  eyes: Yup.string().label("Yeux"),
  outfit: Yup.string().label("Tenue"),
  other: Yup.string().label("Autre"),

  tel: Yup.string().label("Téléphone"),
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
  const [storedImages, setstoredImages] = useState([])

  //progress bar and steps gestion
  const [step, setStep] = useState(0)
  const changeProgress = (i) => {
    setStep(step + i)
  }

  const submit = async (post) => {
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
      const formattedImg = await uploadImages(post.images[i])
      imageKeys.push(formattedImg)
    }
    ///////

    //save the post with all formatted fields

    navigation.navigate("FeedNavigator")
    setStep(0)
    setLoading(false)
  }
  const uploadImages = async (post) => {
    const image = post.images[0]
    if (!image) return null
    const response = await fetch(image)
    const blob = await response.blob()
    const fileKey = uuidv4()
    const childPath = `post/${firebase.auth().currentUser.uid}/${fileKey}`
    const task = firebase.storage().ref().child(childPath).put(blob)
    const taskProgress = (snapshot) => {
      // console.log(`transferred:${snapshot.bytesTransferred}`)
    }
    const taskCompleted = async () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePost(post, snapshot)
      })
    }
    const taskError = (snapshot) => {
      console.log(`snapshot`, snapshot)
    }
    task.on("state_changed", taskProgress, taskError, taskCompleted)
  }

  //upload images in Storage
  const handleSubmit = async (post) => {
    if (!post.images) return
    const strdimgs = await uploadImages(post)
  }

  const savePost = (post, images) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        //creation: firebase.firestore().FieldValue.serverTimestamp(),
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        images: images,
        name: post.name,
        age: post.age,
        date: post.date,
        location: post.location,
        corpulence: post.corpulence,
        height: post.height,
        hair: post.hair,
        eyes: post.eyes,
        outfit: post.outfit,
        other: post.other,
        tel: post.tel,
        email: post.email,
        userID: firebase.auth().currentUser.uid,
      })
      .then(function () {
        navigation.popToTop()
        setstoredImages([])
      })
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
          showsVerticalScrollIndicator={false}
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
              if (values) {
                handleSubmit(values)
                //console.log(`values`, values)
                navigation.navigate("SharingView", values)
              }

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
