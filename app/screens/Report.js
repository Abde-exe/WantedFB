import React from "react"
import { StyleSheet, Text, View } from "react-native"
import AppText from "../components/AppText"
import * as Yup from "yup"

import ImageInput from "../components/forms/ImageInput"
import AppTextInput from "../components/AppTextInput"
import Screen from "../components/Screen"
import AppButton from "../components/AppButton"
import { Formik } from "formik"
import { ImagePicker, SubmitButton } from "../components/forms"

const Report = () => {
  const validationSchema = {
    reportText: Yup.string()
      .required("Veuillez détailler votre avis")
      .label("détail"),
    images: Yup.array(),
  }
  return (
    <Screen>
      <Formik
        initialValues={{ reportText: "", images: [] }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <View>
            <AppText>Amélioration, erreurs ,avis, idées etc</AppText>
            <ImagePicker name="images" />
            <AppTextInput
              name="reportText"
              placeholder="Détails"
              numberOfLines={4}
            />
            <AppButton title="Envoyer" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </Screen>
  )
}

export default Report
