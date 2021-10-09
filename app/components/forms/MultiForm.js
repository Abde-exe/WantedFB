import React, { useState } from "react"
import { Formik } from "formik"
import AppButton from "../AppButton"
import { View } from "react-native"
import SubmitButton from "./SubmitButton"

function MultiForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  progress,
}) {
  const childrenArray = React.Children.toArray(children)
  const oneStep = 1 / childrenArray.length //part of one step progress in the form
  const [step, setstep] = useState(0)
  const currentChild = childrenArray[step]
  return (
    <View style={{ paddingBottom: 32 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <>
            {currentChild}
            <View>
              {step === childrenArray.length - 1 ? (
                <SubmitButton
                  title="Valider"
                  onPress={() => {
                    setstep(0)
                    onSubmit()
                  }}
                />
              ) : null}
              {step < childrenArray.length - 1 ? (
                <AppButton
                  title="Suivant"
                  onPress={() => {
                    setstep((s) => s + 1)
                    progress(oneStep)
                  }}
                />
              ) : null}
              {step > 0 ? (
                <AppButton
                  color="white"
                  text="primary"
                  onPress={() => {
                    setstep((s) => s - 1)
                    progress(-oneStep)
                  }}
                  title="Retour"
                />
              ) : null}
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

export default MultiForm
