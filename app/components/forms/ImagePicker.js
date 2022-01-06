import React from "react"
import { useFormikContext } from "formik"

import ImageInputList from "./ImageInputList"
import ErrorMessage from "./ErrorMessage"

export default ImagePicker = ({ name, required }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext()
  const imageUris = values[name]

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri])
  }
  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    )
  }
  return (
    <>
      <ImageInputList
        required={required}
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}
