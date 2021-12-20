import React from "react"
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import * as Yup from "yup"
import { useNavigation } from "@react-navigation/core"

import AppText from "../AppText"
import MultiForm from "../forms/MultiForm"
import ImagePicker from "../forms/ImagePicker"
import { AppFormField, LocationSearchBar } from "../forms"
import DateInput from "../DateInput"
import SelectRadio from "../forms/SelectRadio"
import colors from "../../../config/colors"
import useSavePost from "../../../hooks/useSavePost"
import { updateUserPost } from "../../../redux/actions/index"
const validationSchema = {
  missings: Yup.object().shape({
    images: Yup.array().min(1, "Sélectionner au moins 1 image"),
    title: Yup.string().required().min(3, "Entrer un nom").label("Nom"),
    age: Yup.number().min(0).max(120).label("Age"),
    date: Yup.date().label("Date"),
    location: Yup.string().label("Localisation"),
    description: Yup.string().label("Description"),

    corpulence: Yup.string().label("Corpulence"),
    height: Yup.number().min(100).max(220).label("Taille"),
    hair: Yup.string().label("Cheveux"),
    eyes: Yup.string().label("Yeux"),
    outfit: Yup.string().label("Tenue"),
    other: Yup.string().label("Autre"),

    tel: Yup.string().label("Téléphone"),
    email: Yup.string().email().label("Email"),
  }),
  students: Yup.object().shape({
    name: Yup.string().required().min(3, "Entrer un nom").label("Nom"),
    age: Yup.number().min(0).max(120).label("Age"),
    location: Yup.string().label("Localisation"),

    type: Yup.string().required().label("Type"),
    domain: Yup.string().label("Domaine"),
    length: Yup.string().label("Durée"),
    place: Yup.string().label("Lieu"),

    title: Yup.string().required().min(3, "Entrer un nom").label("Titre"),
    description: Yup.string().label("Description"),
    images: Yup.array(),
  }),
}
const initialValues = {
  missings: {
    images: [],
    title: "",
    description: "",
    age: "",
    date: new Date(),
    location: "",
    corpulence: "",
    height: "",
    hair: "",
    eyes: "",
    outfit: "",
    other: "",
    email: "",
    tel: "",
  },
  students: {
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
  },
}

const Missings = ({ changeProgress, post, edit }) => {
  const { savePost, uploadImages } = useSavePost()
  const navigation = useNavigation()

  let postValues = {}
  //existing values ready to be modfied
  if (post) {
    postValues = {
      images: post.images,
      title: post.title,
      description: post.description,
      age: post.age,
      date: post.date.toDate(),
      location: post.location,
      corpulence: post.corpulence,
      height: post.height,
      hair: post.hair,
      eyes: post.eyes,
      outfit: post.outfit,
      other: post.other,
      email: post.email,
      tel: post.tel,
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <MultiForm
        validationSchema={validationSchema.missings}
        progress={changeProgress}
        initialValues={post ? postValues : initialValues.missings}
        onSubmit={
          (values) => {
            try {
              //with images picked
              if (values) {
                if (values.images && values.images.length > 0)
                  edit ? updateUserPost(post, values) : uploadImages(values)
                else {
                  //no images in the post
                  edit ? updateUserPost(post, values) : savePost(values, [])
                }
                navigation.navigate("DoneAnimation", { values })
              }
            } catch (error) {
              console.log(`error`, error)
            }
          }

          // resetForm({ values: initialValues })
        }
      >
        {
          //Form 1
        }
        <View>
          <AppText style2={styles.title}>Identité et Signalement</AppText>
          <AppText style2={{ marginLeft: 16 }}>
            Remplissez le plus de champs possible.
          </AppText>
          <ImagePicker name="images" />

          <AppFormField
            name="title"
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
          <LocationSearchBar
            placeholder="Dernière localisation"
            name="location"
          />
          <DateInput
            name="date"
            placeholder="Date de disparition"
            icon="calendar-today"
          />
          <AppFormField
            name="description"
            placeholder="Description ou message"
            multiline
            numberOfLines={4}
          />
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
            placeholder="Taille(cm)"
            width={"31%"}
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
    </KeyboardAvoidingView>
  )
}

const Students = ({ changeProgress, post, edit }) => {
  const { savePost2, uploadImages2 } = useSavePost()
  const navigation = useNavigation()

  let postValues = {}
  //existing values ready to be modfied
  if (post) {
    postValues = {
      name: post.name,
      age: post.age,
      location: post.location,
      type: post.type,
      domain: post.domain,
      place: post.place,
      length: post.length,
      title: post.title,
      description: post.description,
      images: post.images,
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <MultiForm
        validationSchema={validationSchema.students}
        initialValues={post ? postValues : initialValues.students}
        progress={changeProgress}
        onSubmit={(values) => {
          if (values) {
            navigation.navigate("DoneAnimation")

            //with images picked
            if (values.images.length > 0) {
              edit ? updateUserPost(post, values) : uploadImages2(values)
            } else {
              //no images in the post
              edit ? updateUserPost(post, values) : savePost2(values, [])
            }
          }

          // resetForm({ values: initialValues })
        }}
      >
        {
          //Form 1
        }
        <View>
          <AppText style2={styles.title}>Identité</AppText>

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

          <LocationSearchBar placeholder="Localisation" name="location" />
        </View>
        {
          //Form 2
        }
        <View>
          <AppText style2={styles.title}>Poste</AppText>

          <SelectRadio
            name="type"
            typeValues={["Alternance", "Job", "Stage"]}
          />
          <AppFormField name="domain" placeholder="Domaine" />
          <AppFormField name="length" placeholder="Durée" />
          <LocationSearchBar placeholder="Lieu" name="place" />
        </View>
        {
          //Form 3
        }
        <View>
          <AppText style2={styles.title}>Détails</AppText>

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
    </KeyboardAvoidingView>
  )
}

export { Missings, Students }
const styles = StyleSheet.create({
  title: {
    color: colors.secondary,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "600",
    marginVertical: 30,
  },
})
