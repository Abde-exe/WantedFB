import React, { useState } from "react"
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import defaultStyles from "../../config/styles"
import AppText from "./AppText"
import Screen from "./Screen"
import PickerItem from "./PickerItems"

export default function AppPicker({
  icon,
  items,
  placeholder,
  selected,
  onSelect,
}) {
  const [modal, setModal] = useState(false)
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModal(true)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.black}
              style={styles.icon}
            />
          )}
          <AppText style2={styles.text}>
            {selected ? selected.label : placeholder}
          </AppText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.black}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modal} animationType="slide">
        <Screen>
          <Button title="close" onPress={() => setModal(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  setModal(false)
                  onSelect(item)
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  text: { flex: 1, textAlign: "left" },

  icon: {
    marginRight: 10,
  },
})
