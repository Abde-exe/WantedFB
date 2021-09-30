import React, { useState } from "react"
import { View, Text, Pressable, StyleSheet } from "react-native"
import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import colors from "../../../config/colors"
import Screen from "../../components/Screen"
import Firebase from "../../../config/firebase"
import ErrorMessage from "../../components/ErrorMessage"
const auth = Firebase.auth()

export default SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState("eye")
  const [signupError, setSignupError] = useState("")

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off")
      setPasswordVisibility(!passwordVisibility)
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye")
      setPasswordVisibility(!passwordVisibility)
    }
  }
  const onHandleSignup = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth.createUserWithEmailAndPassword(email, password)
      }
    } catch (error) {
      setSignupError(error.message)
    }
  }

  return (
    <Screen style2={styles.container}>
      <Text style={styles.title}>Welcome to Wanted app</Text>
      <Text style={styles.subtitle}>Please register</Text>

      <AppTextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        icon="account"
        placeholder="Email"
        icon="email"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <AppTextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        icon="lock"
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        rightIcon={rightIcon}
        textContentType="password"
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}

      <AppButton title="Register" onPress={onHandleSignup} />

      <View style={styles.footerButtonContainer}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.forgotPasswordButtonText}>
            Already have an account ? Sign in
          </Text>
        </Pressable>
      </View>
    </Screen>
  )
}
const styles = StyleSheet.create({
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
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
})
