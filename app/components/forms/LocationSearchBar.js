import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useFormikContext } from "formik"

import defaultStyles from "../../../config/styles"
import ErrorMessage from "./ErrorMessage"
import environment from "../../../config/environment"
import colors from "../../../config/colors"

const LocationSearchBar = ({ placeholder, name, required }) => {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormikContext()

  const [location, setLocation] = useState(values[name].name)
  const onChange = (newLocation) => {
    setLocation(newLocation.name)
    setFieldValue(name, newLocation)
  }
  return (
    <View style={[styles.container, { borderRightWidth: required ? 2 : 0 }]}>
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
        fetchDetails
        onPress={(data, details) => {
          onChange({
            name: data.description,
            dep: details.address_components[1].long_name,
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
          })
        }}
        textInputProps={{
          onChangeText: (text) => setLocation(text),
          value: location === "" ? values[name].name : location,
        }}
        query={{
          key: environment.GOOGLE_PLACES,
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
    borderColor: colors.danger,
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
