import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import colors from "../../../config/colors"
import AppText from "../../components/AppText"

export default ConfirmSignUp = ({ navigation, route }) => {
  const [username, setUsername] = useState(route.params.username)
  const [authCode, setAuthCode] = useState("")
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode)
      console.log(" Code confirmed")
      navigation.navigate("SignIn")
    } catch (error) {
      console.log(
        " Verification code does not match. Please enter a valid verification code.",
        error.code
      )
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <AppText style={styles.subtitle}>Confirm registration</AppText>

        <AppTextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          icon="email"
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        <AppTextInput
          value={authCode}
          onChangeText={(text) => setAuthCode(text)}
          icon="numeric"
          placeholder="Email verification code"
          keyboardType="numeric"
        />

        <AppButton title="Confirmer" onPress={confirmSignUp} />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
  },
  title: {
    fontSize: 32,
    color: colors.primary,
    fontWeight: "500",
    marginVertical: 24,
  },
  subtitle: {
    alignSelf: "flex-start",
    marginLeft: 16,
    fontSize: 24,
    color: colors.black,
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 24,
  },
})
