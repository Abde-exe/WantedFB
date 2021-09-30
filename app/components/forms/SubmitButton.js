import React from "react"
import { useFormikContext } from "formik"
import AppButton from "../AppButton"

const SubmitButton = ({ title, onPress }) => {
  const { handleSubmit, resetForm } = useFormikContext()

  const combinedFunctions = () => {
    onPress()
    handleSubmit()
  }

  return (
    <AppButton
      title={title}
      onPress={combinedFunctions}
      style2={{ marginTop: 10 }}
    />
  )
}

export default SubmitButton
