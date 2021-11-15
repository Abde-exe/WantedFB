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
  Text,
  FlatList,
} from "react-native"
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"
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
  name: Yup.string().required().min(3, "Entrer un nom").label("Nom"),
  age: Yup.number().min(0).max(120).label("Age"),
  location: Yup.string().label("Localisation"),

  domain: Yup.string().label("Domaine"),
  length: Yup.string().label("Durée"),
  place: Yup.string().label("Lieu"),

  title: Yup.string().required().min(3, "Entrer un nom").label("Titre"),
  description: Yup.string().label("Description"),
  images: Yup.array(),

  // rhythm: Yup.string().label("Rythme"),
  // tel: Yup.string().label("Téléphone"),
  // email: Yup.string().email().label("Email"),
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
const PostEdit2 = ({ navigation }) => {
  const scrollView = useRef()

  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [storedImages, setstoredImages] = useState([])
  const [postType, setpostType] = useState("")

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
    const imagesBlob = []

    const images = post.images
    const childPath = `students/${firebase.auth().currentUser.uid}`

    await Promise.all(
      images.map(async (image) => {
        const response = await fetch(image)
        const blob = await response.blob()
        const ref = firebase.storage().ref(childPath).child(`${uuidv4()}.png`)

        await ref.put(blob).then((result) => {
          imagesBlob.push(result.metadata.name)
        })
        await ref.getDownloadURL(blob).then((result) => {
          imagesBlob.pop()
          imagesBlob.push(result)
        })
      })
    ).then(() => savePost(post, imagesBlob))
  }

  //upload images in Storage
  const handleSubmit = async (post) => {
    if (!post.images) return
    const strdimgs = await uploadImages(post)
  }

  const savePost = (post, images) => {
    let doc = firebase
      .firestore()
      .collection("students")
      .add({
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        name: post.name,
        age: post.age,
        location: post.location,

        type: postType,
        domain: post.domain,
        length: post.length,
        place: post.place,

        title: post.title,
        description: post.description,
        images: images,
        //tel: post.tel,
        //email: post.email,
        userID: firebase.auth().currentUser.uid,
      })
      .then(function () {
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
              name: "",
              age: "",
              location: "",
              type: "",
              domain: "",
              place: "",
              length: "",
              title: "",
              description: "",
              images: [],
            }}
            onSubmit={(values) => {
              if (values) {
                handleSubmit(values)
                //console.log(`values`, values)
                //navigation.navigate("SharingView", values)
              }

              // resetForm({ values: initialValues })
            }}
          >
            {
              //Form 1
            }
            <View>
              <AppText style2={{ marginLeft: 16, marginTop: 32 }}>
                Qui est tu ?
              </AppText>
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

              <AppButton onPress={() => setModalVisible(true)} />

              <AppFormField
                placeholder="Lieu"
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
              <AppText style2={{ marginLeft: 16, marginTop: 32 }}>
                Tu cherches quoi ?
              </AppText>
              <RadioButtonGroup
                containerStyle={{
                  marginHorizontal: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                selected={postType}
                onSelected={(value) => setpostType(value)}
                radioBackground={colors.secondary}
              >
                <RadioButtonItem value="Stage" label="Stage" />
                <RadioButtonItem value="Test" label="Alternance" />
                <RadioButtonItem value="Job" label="Job" />
              </RadioButtonGroup>
              <AppFormField name="domain" placeholder="Domaine" />
              <AppFormField name="length" placeholder="Durée" />
              <AppFormField placeholder="Lieu" name="place" icon="map-marker" />
            </View>
            {
              //Form 3
            }
            <View>
              <AppText style2={{ marginLeft: 16, marginTop: 32 }}>
                Dernières infos pour le post..
              </AppText>

              <AppFormField name="title" placeholder="Titre" />
              <AppFormField
                name="description"
                placeholder="Description"
                multiline
                numberOfLines={4}
              />
              <ImagePicker name="images" />
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

export default PostEdit2

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
