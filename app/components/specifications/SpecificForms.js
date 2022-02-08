import React from "react"
import { View, StyleSheet } from "react-native"
import * as Yup from "yup"
import { useNavigation } from "@react-navigation/core"
import { v4 as uuidv4 } from "uuid"
import firebase from "firebase"
import { addUserPost } from "../../../redux/actions"
import AppText from "../AppText"
import MultiForm from "../forms/MultiForm"
import ImagePicker from "../forms/ImagePicker"
import { AppFormField, LocationSearchBar } from "../forms"
import DateInput from "../DateInput"
import SelectRadio from "../forms/SelectRadio"
import colors from "../../../config/colors"
import { updateUserPost } from "../../../redux/actions/index"
import { useDispatch } from "react-redux"
const validationSchema = {
  missings: Yup.object().shape({
    images: Yup.array().min(1, "Sélectionnez au moins 1 image"),
    title: Yup.string()
      .required("Veuillez entrer un nom")
      .min(3, "Le nom doit être d'au moins 3 caractères")
      .label("Nom"),
    age: Yup.number()
      .min(0, "Entrez une valeur entre 0 et 120 ans")
      .max(120, "Entrez une valeur entre 0 et 120 ans")
      .label("Age"),
    date: Yup.date().label("Date"),
    location: Yup.object()
      .required("Veuillez entrer une localisation")
      .label("Localisation"),
    //

    description: Yup.string().label("Description"),

    corpulence: Yup.string().label("Corpulence"),
    height: Yup.number()
      .min(100, "Entrez une valeur entre 100 et 220 ans")
      .max(220, "Entrez une valeur entre 100 et 220 ans")
      .label("Taille"),
    hair: Yup.string().label("Cheveux"),
    eyes: Yup.string().label("Yeux"),
    outfit: Yup.string().label("Tenue"),
    other: Yup.string().label("Autre"),

    tel: Yup.string().label("Téléphone"),
    email: Yup.string()
      .required()
      .email("Entrez une adresse email valide")
      .label("Email"),
  }),
  students: Yup.object().shape({
    name: Yup.string()
      .required("Entrez un nom")
      .min(3, "Entrez un nom")
      .label("Nom"),

    type: Yup.string().required("Choisissez le type d'annonce").label("Type"),
    domain: Yup.string().required("Indiquez dans quel d").label("Domaine"),
    length: Yup.string().label("Durée"),
    location: Yup.object().label("Lieu"),

    title: Yup.string()
      .required("Entrez un titre")
      .min(3, "Entrez un titre")
      .label("Titre"),
    description: Yup.string().label("Description"),
    images: Yup.array(),
    tel: Yup.string().label("Téléphone"),
    email: Yup.string().email("Entrez une adresse email valide").label("Email"),
  }),
  animals: Yup.object().shape({
    name: Yup.string().min(3, "Entrez un nom").label("Nom"),
    age: Yup.number().min(0).max(120).label("Age"),
    location: Yup.object().label("Localisation"),
    date: Yup.date().label("Date"),
    title: Yup.string().required().min(3, "Entrez un titre").label("Titre"),
    description: Yup.string().label("Description"),
    race: Yup.string().label("Race"),
    other: Yup.string().label("Autre"),
    sexe: Yup.string().label("Sexe"),
    images: Yup.array(),
    tel: Yup.string().label("Téléphone"),
    email: Yup.string().email("Entrez une adresse email valide").label("Email"),
  }),
}
const initialValues = {
  missings: {
    images: [],
    title: "",
    description: "",
    age: "",
    date: new Date(),
    location: { name: "" },
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
    date: "",
    type: "",
    domain: "",
    location: { name: "" },
    length: "",
    tel: "",
    email: "",
    title: "",
    description: "",
    images: [],
  },
  animals: {
    name: "",
    age: "",
    location: { name: "" },
    race: "",
    sexe: "",
    title: "",
    date: new Date(),
    other: "",
    description: "",
    tel: "",
    email: "",
    images: [],
  },
}

const Missings = ({ changeProgress, post, edit }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  //uploading the images in the storage
  const uploadImages = async (post) => {
    const imagesBlob = []
    const images = post.images
    const childPath = `${post.postType}/${firebase.auth().currentUser.uid}`

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
  //saving post
  const savePost = (post, images) => {
    //delete all empty strings
    for (const key in post) {
      if (post[key] === "") {
        delete post[key]
      }
    }

    let doc = firebase
      .firestore()
      .collection(post.postType)
      .add({
        ...post,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        images: images,
        state: "disparu(e)",
        userID: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        const newpost = {
          ...post,
          id: result.id,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          images: images,
          state: "disparu(e)",
          userID: firebase.auth().currentUser.uid,
        }
        dispatch(addUserPost(newpost))
      })
  }

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
    <MultiForm
      validationSchema={validationSchema.missings}
      progress={changeProgress}
      initialValues={post ? postValues : initialValues.missings}
      onSubmit={(values, formikActions) => {
        try {
          //with images picked
          if (values) {
            values = { ...values, postType: "missings" }
            if (values.images && values.images.length > 0)
              edit ? updateUserPost(post, values) : uploadImages(values)
            else {
              //no images in the post
              edit ? updateUserPost(post, values) : savePost(values, [])
            }

            //reset form
            formikActions.resetForm()

            navigation.navigate("SharingView", { post: values })
          }
        } catch (error) {
          console.log(`error`, error)
        }
      }}
    >
      {
        //Form 1
      }
      <View>
        <AppText style2={styles.title}>Signalement</AppText>
        <ImagePicker name="images" required={true} />

        <AppFormField
          required
          name="title"
          placeholder="Nom, prénom"
          icon="account"
        />
        <AppFormField
          name="age"
          keyboardType="numeric"
          maxLength={3}
          placeholder="Age"
          width={"22%"}
        />
        <AppFormField
          name="description"
          placeholder="Message"
          multiline
          numberOfLines={3}
        />
        <LocationSearchBar
          placeholder="Dernière localisation"
          name="location"
          required
        />
        <DateInput
          name="date"
          placeholder="Date de disparition"
          icon="calendar-today"
        />
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Les champs en rouge sonts requis
        </AppText>
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
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Ces informations seront affichées dans l'annonce
        </AppText>
      </View>
    </MultiForm>
  )
}

const Students = ({ changeProgress, post, edit }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  //uploading the images in the storage
  const uploadImages = async (post) => {
    const imagesBlob = []
    const images = post.images
    const childPath = `${post.postType}/${firebase.auth().currentUser.uid}`

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
  //saving post
  const savePost = (post, images) => {
    //delete all empty strings
    for (const key in post) {
      if (post[key] === "") {
        delete post[key]
      }
    }

    let doc = firebase
      .firestore()
      .collection(post.postType)
      .add({
        ...post,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        images: images,
        userID: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        const newpost = {
          ...post,
          id: result.id,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          images: images,
          userID: firebase.auth().currentUser.uid,
        }
        dispatch(addUserPost(newpost))
      })
  }

  let postValues = {}
  //existing values ready to be modfied
  if (post) {
    postValues = {
      name: post.name,
      age: post.age,
      location: post.location,
      type: post.type,
      domain: post.domain,
      location: post.location,
      length: post.length,
      title: post.title,
      description: post.description,
      images: post.images,
      tel: post.tel,
      email: post.email,
    }
  }
  return (
    <MultiForm
      validationSchema={validationSchema.students}
      initialValues={post ? postValues : initialValues.students}
      progress={changeProgress}
      onSubmit={(values, formikActions) => {
        try {
          //with images picked
          if (values) {
            values = { ...values, postType: "students" }
            if (values.images && values.images.length > 0)
              edit ? updateUserPost(post, values) : uploadImages(values)
            else {
              //no images in the post
              edit
                ? updateUserPost(post, values)
                : savePost(values, [
                    "https://firebasestorage.googleapis.com/v0/b/wanted-316010.appspot.com/o/assets%2Fpp.png?alt=media&token=f564d417-d3ce-48f8-a211-3589664c0a03",
                  ])
            }
            //reset form
            formikActions.resetForm()
            navigation.navigate("SharingView", { post: values })
          }
        } catch (error) {
          console.log(`error`, error)
        }
      }}
    >
      {
        //Form 1
      }
      <View>
        <AppText style2={styles.title}>Annonce</AppText>
        <SelectRadio name="type" typeValues={["Alternance", "Job", "Stage"]} />

        <AppFormField name="title" placeholder="Titre" required />
        <AppFormField
          name="description"
          placeholder="Description"
          multiline
          numberOfLines={4}
        />

        <AppFormField name="domain" placeholder="Domaine" required />
        <AppFormField name="length" placeholder="Durée" />
        <LocationSearchBar placeholder="Lieu" name="location" />
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Les champs en rouge sonts requis
        </AppText>
      </View>
      {
        //Form 2
      }
      <View>
        <AppText style2={styles.title}>Détails</AppText>
        <ImagePicker name="images" />

        <AppFormField
          required
          name="name"
          placeholder="Nom, prénom..."
          icon="account"
        />

        <AppFormField
          width={"40%"}
          name="tel"
          placeholder="Téléphone"
          keyboardType="numeric"
          maxLength={10}
        />
        <AppFormField name="email" placeholder="Email" />
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Ces informations seront affichées dans l'annonce
        </AppText>
      </View>
    </MultiForm>
  )
}
const Animals = ({ changeProgress, post, edit }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  //uploading the images in the storage
  const uploadImages = async (post) => {
    const imagesBlob = []

    const images = post.images
    const childPath = `${post.postType}/${firebase.auth().currentUser.uid}`

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
  //saving post
  const savePost = (post, images) => {
    //delete all empty strings
    for (const key in post) {
      if (post[key] === "") {
        delete post[key]
      }
    }

    let doc = firebase
      .firestore()
      .collection("animals")
      .add({
        ...post,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        images: images,
        state: "disparu(e)",
        userID: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        const newpost = {
          ...post,
          id: result.id,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          images: images,
          state: "disparu(e)",
          userID: firebase.auth().currentUser.uid,
        }
        dispatch(addUserPost(newpost))
      })
  }

  let postValues = {}
  //existing values ready to be modfied
  if (post) {
    postValues = {
      images: post.images,
      title: post.title,
      description: post.description,
      age: post.age,
      name: post.name,
      date: post.date.toDate(),
      location: post.location.name,
      sexe: post.sexe,
      race: post.race,
      email: post.email,
      tel: post.tel,
    }
  }
  return (
    <MultiForm
      validationSchema={validationSchema.animals}
      progress={changeProgress}
      initialValues={post ? postValues : initialValues.animals}
      onSubmit={(values, formikActions) => {
        try {
          //with images picked
          if (values) {
            values = { ...values, postType: "animals" }
            if (values.images && values.images.length > 0)
              edit ? updateUserPost(post, values) : uploadImages(values)
            else {
              //no images in the post
              edit ? updateUserPost(post, values) : savePost(values, [])
            }

            //reset form
            formikActions.resetForm()

            navigation.navigate("SharingView", { post: values })
          }
        } catch (error) {
          console.log(`error`, error)
        }
      }}
    >
      {
        //Form 1
      }
      <View>
        <AppText style2={styles.title}>Signalement</AppText>
        <ImagePicker name="images" required={true} />
        <AppFormField required name="title" placeholder="Titre" />
        <AppFormField
          name="description"
          placeholder="Message"
          multiline
          numberOfLines={3}
        />
        <LocationSearchBar
          placeholder="Dernière localisation"
          name="location"
          required
        />
        <DateInput
          name="date"
          placeholder="Date de disparition"
          icon="calendar-today"
        />
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Les champs en rouge sonts requis
        </AppText>
      </View>
      {
        //Form 2
      }
      <View>
        <AppText style2={styles.title}>Description</AppText>
        <AppFormField required name="name" placeholder="Nom" />
        <AppFormField
          name="age"
          keyboardType="numeric"
          maxLength={3}
          placeholder="Age"
          width={"22%"}
        />

        <SelectRadio name="sexe" typeValues={["Femelle", "Mâle"]} />
        <AppFormField name="race" placeholder="Race" />

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
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Ces informations seront affichées dans l'annonce
        </AppText>
      </View>
    </MultiForm>
  )
}
export { Missings, Students, Animals }
const styles = StyleSheet.create({
  title: {
    color: colors.secondary,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "600",
    marginVertical: 15,
  },
})
