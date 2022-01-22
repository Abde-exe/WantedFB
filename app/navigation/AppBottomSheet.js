import React, { useRef, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { StackActions } from "@react-navigation/native"

const popAction = StackActions.pop(1)

import Icon from "../components/Icon"
import AppText from "../components/AppText"
import colors from "../../config/colors"
import { useNavigation } from "@react-navigation/native"
const AppBottomSheet = () => {
  const navigation = useNavigation()
  const sheetRef = useRef(null)
  const [isOpen, setisOpen] = useState(true)

  return (
    <View style={{ backgroundColor: "gray", flex: 1 }}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["25%"]}
        //enablePanDownToClose={true}
        onClose={() => {
          navigation.dispatch(popAction)
        }}
      >
        <BottomSheetView>
          <Pressable
            style={(args) => {
              if (args.pressed) {
                return [
                  styles.view,
                  {
                    backgroundColor: "transparent",
                    opacity: 0.5,
                  },
                ]
              }
              return [styles.view]
            }}
            onPress={() =>
              navigation.navigate("PostCreate", { type: "missings" })
            }
          >
            <Icon
              size={40}
              name="account-child"
              iconColor={colors.secondary}
              backgroundColor="white"
            />
            <AppText style2={styles.text}>Disparitions</AppText>
          </Pressable>
          <Pressable
            style={styles.view}
            onPress={() =>
              navigation.navigate("PostCreate", { type: "students" })
            }
          >
            <Icon
              name="school"
              size={40}
              iconColor={colors.secondary}
              backgroundColor="white"
            />
            <AppText style2={styles.text}>Etudiants</AppText>
          </Pressable>
          <Pressable
            style={styles.view}
            onPress={() =>
              navigation.navigate("PostCreate", { type: "animals" })
            }
          >
            <Icon
              name="dog"
              size={40}
              iconColor={colors.secondary}
              backgroundColor="white"
            />
            <AppText style2={styles.text}>Animaux</AppText>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default AppBottomSheet

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
})
