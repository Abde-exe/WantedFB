import React from "react"
import {
  StyleSheet,
  Modal,
  View,
  FlatList,
  Pressable,
  Text,
} from "react-native"

import colors from "../../config/colors"
import Icon from "./Icon"
import AppText from "./AppText"
import IconButton from "./IconButton"
const AppModal3 = ({ modalVisible, setModalVisible, action }) => {
  const categories = [
    {
      backgroundColor: "#fc5c65",
      icon: "account",
      label: "email",
      screen: "PostCreate",
      text: "Disparition",
      value: 1,
    },
    {
      backgroundColor: "#fc5c65",
      icon: "school",
      label: "tel",
      screen: "PostCreate2",
      text: "Etudiant",
      value: 2,
    },
  ]
  return (
    <View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <View
            style={{
              alignSelf: "flex-end",
              marginRight: 16,
              marginVertical: 8,
            }}
          >
            <IconButton
              onPress={() => setModalVisible(false)}
              name="close-circle"
              color={colors.white}
              size={30}
            />
          </View>
          <FlatList
            contentContainerStyle={{
              flex: 1,
              justifyContent: "space-around",
            }}
            horizontal
            data={categories}
            keyExtractor={(item) => item.label.toString()}
            numColumns={1}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  action.navigate("PostCreateStack", {
                    screen: "PostCreateX",
                    params: { type: item.screen },
                  })
                  setModalVisible(false)
                }}
              >
                <Icon
                  size={80}
                  name={item.icon}
                  iconColor={colors.secondary}
                  backgroundColor={"white"}
                />
                <AppText style2={{ textAlign: "center" }}>{item.text}</AppText>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </View>
  )
}

export default AppModal3

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    height: "20%",
    flexDirection: "column",
    backgroundColor: colors.light,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
})
