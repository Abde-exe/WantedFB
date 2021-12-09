import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useFormikContext } from "formik"

import defaultStyles from "../../../config/styles"
import ErrorMessage from "./ErrorMessage"

const LocationSearchBar = ({ placeholder, name }) => {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormikContext()

  const [location, setLocation] = useState(values["location"])

  const onChange = (newLocation) => {
    setLocation(newLocation)
    setFieldValue(name, newLocation)
  }
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="map-marker"
        size={20}
        color={defaultStyles.colors.black}
        style={styles.icon}
      />
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        disableScroll
        placeholder={placeholder}
        onPress={(data) => {
          onChange(data.description)
        }}
        textInputProps={{
          onChangeText: (text) => setLocation(text),
          value: location,
        }}
        query={{
          key: "AIzaSyCeoQjaosVPYf8xS0QxiqIOL_od4exQf8s",
          language: "fr",
          types: "(cities)",
          components: "country:fr",
        }}
        styles={{
          textInput: styles.textInput,
          row: styles.row,
          poweredContainer: styles.row,
        }}
        keyboardShouldPersistTaps="handled"
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  )
}

export default LocationSearchBar

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    fontSize: 18,
    color: defaultStyles.colors.dark,
    backgroundColor: defaultStyles.colors.light,
  },
  row: { backgroundColor: defaultStyles.colors.light },
})
