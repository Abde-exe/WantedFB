import React, { useEffect } from "react"
import {
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import Ionicons from "@expo/vector-icons/Ionicons"

import colors from "../../../config/colors"

export default ImageInput = ({ imageUri, onChange }) => {
  useEffect(() => {
    requestPermission()
  }, [])

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!granted) {
      alert("Vous devez autoriser l'accès à la galerie photos")
    }
  }
  const handlePress = () => {
    if (!imageUri) selectImage()
    else {
      Alert.alert("Supprimer", "Vous voulez vraiment supprimer l'image ?", [
        { text: "Oui", onPress: () => onChange(null) },
        { text: "Non" },
      ])
    }
  }

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      })
      if (!result.cancelled) {
        onChange(result.uri)
      }
    } catch (error) {
      console.log(`Erreur chargement de l'image`, error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && <Ionicons name="camera" size={40} color={colors.dark} />}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
})
