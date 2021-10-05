import React, { useState } from "react"
import { View, Text, Pressable, StyleSheet, Button } from "react-native"

import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import colors from "../../../config/colors"
import Screen from "../../components/Screen"
import ErrorMessage from "../../components/ErrorMessage"
import Firebase from "../../../config/firebase"

const auth = Firebase.auth()

const Login = ({ navigation }) => {
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
      <Text style={styles.title}>Bonjour</Text>
      <Text style={styles.subtitle}>
        Veuillez vous connecter pour entrer sur Wanted
      </Text>

      <AppTextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        icon="email"
        placeholder="Email"
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
        placeholder="Mot de passe"
        autoCapitalize="none"
        autoCorrect={false}
        rightIcon={rightIcon}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <Pressable
        style={{ width: "100%", paddingHorizontal: 16, marginBottom: 32 }}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.forgotPasswordButtonText}>Mot de passe oublié</Text>
      </Pressable>
      <AppButton title="Connexion" onPress={onLogin} />

      <View style={styles.footerButtonContainer}>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ color: colors.secondary, fontSize: 16 }}>
            Pas de compte ? S'inscrire
          </Text>
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
    marginTop: 24,
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 16,
    color: colors.black,
    fontWeight: "100",
    marginBottom: 32,
  },

  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  forgotPasswordButtonText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "600",
  },
})
