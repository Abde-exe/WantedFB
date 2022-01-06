import React from "react"
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  Dimensions,
} from "react-native"
import colors from "../../config/colors"
import AppText from "./AppText"

const AppModal2 = ({ visible, onClose, onPress, text, confirmText }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.")
        setVisible(false)
      }}
    >
      <View style={styles.modalView}>
        <AppText style2={styles.modalText}>{text} </AppText>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <Pressable
            style={[styles.button, styles.buttonCancel]}
            onPress={() => onClose(false)}
          >
            <AppText style2={styles.textStyle2}>Annuler</AppText>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onPress}
          >
            <AppText style2={styles.textStyle}>{confirmText}</AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "orange",
  },
  modalView: {
    top: Dimensions.get("window").height / 2.5,
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    alignSelf: "center",
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
    backgroundColor: colors.danger,
  },
  buttonCancel: {
    backgroundColor: colors.white,
    borderColor: colors.danger,
    borderWidth: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle2: {
    color: colors.danger,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
})

export default AppModal2
