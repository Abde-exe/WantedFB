import React, { useState } from "react"
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
  View,
} from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

import defaultStyles from "../../config/styles"
import AppText from "./AppText"
import PickerItem from "./PickerItems"
import colors from "../../config/colors"
import IconButton from "./IconButton"
export default function AppPicker({ icon, items, placeholder, action }) {
  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState(items[0])
  return (
    <>
      <Pressable
        onPress={() => setModal(true)}
        style={(args) => {
          if (args.pressed) {
            return [
              {
                backgroundColor: "transparent",
                opacity: 0.5,
              },
            ]
          }
        }}
      >
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
            {selected ? selected.num_dep : placeholder}
          </AppText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.black}
          />
        </View>
      </Pressable>
      <Modal visible={modal} animationType="slide">
        <IconButton
          name="close-circle"
          size={26}
          onPress={() => setModal(false)}
          style2={{ position: "absolute", right: 16, top: 8 }}
        />

        <FlatList
          data={items}
          keyExtractor={(item) => item["num_dep"]}
          renderItem={({ item }) => (
            <PickerItem
              label={`${item["num_dep"]} - ${item["dep_name"]}`}
              onPress={() => {
                setModal(false)
                setSelected(item)
                action(item.dep_name)
              }}
            />
          )}
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 10,
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    marginVertical: 8,
  },

  icon: {},
})
