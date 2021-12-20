import React from "react"
import { StyleSheet, Modal, View, Pressable } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

import colors from "../../config/colors"
import Icon from "./Icon"
const AppModal = ({ modalVisible, setModalVisible, action }) => {
  const categories = [
    {
      backgroundColor: "#fc5c65",
      icon: "email",
      label: "email",
      text: "Email",
      value: 1,
    },
    {
      backgroundColor: "#fc5c65",
      icon: "phone",
      label: "tel",
      text: "Téléphone",
      value: 2,
    },
  ]
  return (
    <View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <Pressable
            onPress={() => {
              setModalVisible(false)
            }}
            style={{
              alignSelf: "flex-end",
              marginRight: 16,
              marginVertical: 8,
            }}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={30}
              color={colors.white}
            />
          </Pressable>
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            {categories.map((item) => (
              <Pressable onPress={() => action(item.label)} key={item.text}>
                <Icon
                  size={80}
                  name={item.icon}
                  iconColor={colors.secondary}
                  backgroundColor={"white"}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default AppModal

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "30%",
    flexDirection: "column",
    backgroundColor: colors.light,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
})
