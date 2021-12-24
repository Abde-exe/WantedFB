import React, { useEffect, useState } from "react"
import { View, Text, Pressable, StyleSheet, Image, Button } from "react-native"

import * as WebBrowser from "expo-web-browser"
import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import colors from "../../../config/colors"
import Screen from "../../components/Screen"
import ErrorMessage from "../../components/ErrorMessage"
import Firebase from "../../../config/firebase"
import GoogleLogin from "./GoogleLogin"
import FBLogin from "./FBLogin"
import Separator from "../../components/Separator"
import AppText from "../../components/AppText"
import styles from "./style"
const auth = Firebase.auth()
WebBrowser.maybeCompleteAuthSession()
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState("eye")
  const [loginError, setLoginError] = useState("")

  const OnPressRightIcon = () => {
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
      <Image
        style={{ width: 100, height: 100, alignSelf: "center" }}
        source={require("../../../assets/icon2.png")}
      />
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
        OnPressRightIcon={OnPressRightIcon}
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <Pressable
        style={{ width: "100%", paddingHorizontal: 16, marginBottom: 32 }}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.forgotPasswordButtonText}>Mot de passe oublié</Text>
      </Pressable>
      <AppButton title="Connexion" onPress={onLogin} />

      <Separator />
      <View>
        <AppText style={{ marginVertical: 8 }}>Ou continuer avec</AppText>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "50%",
        }}
      >
        <GoogleLogin />
        <FBLogin />
      </View>
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
