import React, { useState } from "react"
import { View, Text, Pressable, StyleSheet, Button } from "react-native"

import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import colors from "../../../config/colors"
import Screen from "../../components/Screen"
import ErrorMessage from "../../components/ErrorMessage"
import Firebase from "../../../config/firebase"

const auth = Firebase.auth()

const Login = ({ navigation, updateAuthState }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState("eye")
  const [loginError, setLoginError] = useState("")

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off")
      setPasswordVisibility(!passwordVisibility)
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye")
      setPasswordVisibility(!passwordVisibility)
    }
  }
  const onLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth.signInWithEmailAndPassword(email, password)
      }
    } catch (error) {
      setLoginError(error.message)
    }
  }

  return (
    <Screen style2={styles.container}>
      <Text style={styles.title}>Welcome on Wanted app</Text>
      <Text style={styles.subtitle}>Please login to your account</Text>

      <AppTextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        icon="email"
        placeholder="Enter email"
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
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        rightIcon={rightIcon}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}

      <AppButton title="Log in" onPress={onLogin} />

      <View style={styles.footerButtonContainer}>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.forgotPasswordButtonText}>
            Not registered ? Sign Up
          </Text>
        </Pressable>
      </View>
      <View style={styles.footerButtonContainer}>
        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPasswordButtonText}>Forgot password</Text>
        </Pressable>
      </View>
      {/*
      <Button
        title="testFB"
        onPress={() => Auth.federatedSignIn({ provider: "Facebook" })}
        iconRight
      />
      <Button
        title="testGo"
        onPress={() => Auth.federatedSignIn({ provider: "Google" })}
        iconRight
      />
      */}
    </Screen>
  )
}
export default Login
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
