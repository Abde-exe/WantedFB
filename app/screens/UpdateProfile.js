import React, { useState } from "react"
import { Modal, Pressable, Text, StyleSheet, View } from "react-native"

import * as ImagePicker from "expo-image-picker"

const UpdateProfile = ({ modal, setModal }) => {
  const [image, setImage] = useState(
    "https://pbs.twimg.com/profile_images/1378754086410059781/MGIzuwHm_400x400.jpg"
  )
  //image
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      })
      if (!result.cancelled) {
        setImage(result.uri)
        updateImage(result.uri)
      }
    } catch (error) {
      console.log(`Erreur chargement de l'image`, error)
    }
  }
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal(false)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "red",
    borderTopStartRadius: 20,
    width: "100%",
    height: "100%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  image: {
    height: 100,
    width: 100,
  },
})
