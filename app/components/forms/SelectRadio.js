import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"
import { useFormikContext } from "formik"

import colors from "../../../config/colors"
import ErrorMessage from "./ErrorMessage"

const SelectRadio = ({ name, typeValues, ...otherProps }) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext()

  const setTypeValues = () => {
    return typeValues.map((e) => {
      return <RadioButtonItem key={e} value={e} label={e} />
    })
  }
  return (
    <>
      <RadioButtonGroup
        {...otherProps}
        containerStyle={{
          marginHorizontal: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        selected={values.type}
        onSelected={(value) => {
          setFieldValue(name, value)
        }}
        radioBackground={colors.secondary}
      >
        {setTypeValues()}
      </RadioButtonGroup>
      <ErrorMessage error={errors[name]} visible={true} />
    </>
  )
}

export default SelectRadio

const styles = StyleSheet.create({})
