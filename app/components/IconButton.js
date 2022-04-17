import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

const IconButton = ({
  color = colors.medium,
  size,
  onPress,
  name,
  backgroundColor,
  style2,
}) => {
  return (
    <View
      style={{
        borderRadius: size,
        backgroundColor: backgroundColor,
        padding: 4,
      }}
    >
      <Pressable
        style={(args) => {
          if (args.pressed) {
            return [
              {
                width: size,
                height: size,
                borderRadius: size,
                backgroundColor: "transparent",
                alignItems: "center",
                opacity: 0.5,
              },
              style2,
            ];
          }

          return [
            {
              justifyContent: "center",
              alignItems: "center",
            },
            style2,
          ];
        }}
        onPress={onPress}
      >
        <MaterialCommunityIcons name={name} size={size} color={color} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default IconButton;
