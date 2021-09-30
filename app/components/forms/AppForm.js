import React, { useState } from "react"
import { Formik } from "formik"
import AppButton from "../AppButton"
import { View } from "react-native"

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  )
}

export default AppForm
