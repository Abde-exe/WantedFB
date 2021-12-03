import { Platform } from "react-native"

import colors from "./colors"

export default {
  colors,
  text: {
    marginHorizontal: 8,
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
  },
}
