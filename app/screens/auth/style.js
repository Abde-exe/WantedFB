import { StyleSheet } from "react-native"
import colors from "../../../config/colors"

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
  title: {
    fontSize: 32,
    color: colors.primary,
    fontWeight: "500",
    marginTop: 24,
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 18,
    color: colors.black,
    fontWeight: "100",
    marginVertical: 16,
  },

  footerButtonContainer: {
    marginTop: 20,
  },

  forgotPasswordButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
})
