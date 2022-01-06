import React from "react"
import { useFormikContext } from "formik"

import AppTextInput from "../AppTextInput"
import ErrorMessage from "./ErrorMessage"

const AppFormField = ({ name, width, required, ...otherProps }) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext()
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => {
          setFieldValue(name, text)
        }}
        value={values[name].toString()}
        width={width}
        {...otherProps}
        required={required}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}

export default AppFormField
