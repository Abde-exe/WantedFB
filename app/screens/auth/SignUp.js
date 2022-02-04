import React, { useState } from "react"
import { View, Text, Pressable, StyleSheet, Image } from "react-native"
import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import Screen from "../../components/Screen"
import ErrorMessage from "../../components/ErrorMessage"
import firebase from "firebase"
import GoogleLogin from "./GoogleLogin"
import FBLogin from "./FBLogin"
import Separator from "../../components/Separator"
import AppText from "../../components/AppText"
import styles from "./style"

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState("eye")
  const [signupError, setSignupError] = useState("")

  const pp =
    "https://firebasestorage.googleapis.com/v0/b/wanted-316010.appspot.com/o/assets%2Fpp.png?alt=media&token=f564d417-d3ce-48f8-a211-3589664c0a03"

  const OnPressRightIcon = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off")
      setPasswordVisibility(!passwordVisibility)
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye")
      setPasswordVisibility(!passwordVisibility)
    }
  }
  const onHandleSignup = () => {
    //////
    try {
      if (email !== "" && password !== "") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((result) => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                email,
                name: email.split("@")[0],
                image: pp,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
              })
          })
      }
    } catch (error) {
      setSignupError(error.message)
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
        Veuillez créer un compte pour utiliser Wanted
      </Text>

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
        placeholder="Mot de passe"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        rightIcon={rightIcon}
        textContentType="password"
        OnPressRightIcon={OnPressRightIcon}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}

      <AppButton title="Inscription" onPress={onHandleSignup} />
      <View style={styles.footerButtonContainer}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.forgotPasswordButtonText}>
            Déjà un compte ? Se connecter
          </Text>
        </Pressable>
      </View>
      {/* <Separator />
      <View>
        <AppText style={{ marginVertical: 8 }}>Ou continuer avec</AppText>
      </View>
      {Platform.OS === "android" ? (
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
      ) : null} */}
    </Screen>
  )
}
export default SignUp
