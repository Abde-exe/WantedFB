import React, { useState } from "react"
import { View, Text, Pressable, StyleSheet } from "react-native"
import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import colors from "../../../config/colors"
import Screen from "../../components/Screen"
import Firebase from "../../../config/firebase"
import ErrorMessage from "../../components/ErrorMessage"
import firebase from "firebase"
const auth = Firebase.auth()
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState("eye")
  const [signupError, setSignupError] = useState("")

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
    //get the default profile picture
    const pp = ""
    const storageRef = Firebase.storage().ref()
    storageRef
      .child("assets/pp.png")
      .getDownloadURL()
      .then((url) => {
        pp = url
      })
    //////
    try {
      if (email !== "" && password !== "") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((result) => {
            console.log(`result`, result)
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
      <Text style={styles.title}>Bonjour</Text>
      <Text style={styles.subtitle}>
        Veuillez créer un compte pour entrer sur Wanted
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

      <AppButton title="S'inscrire" onPress={onHandleSignup} />

      <View style={styles.footerButtonContainer}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.forgotPasswordButtonText}>
            Déjà un compte ? Se connecter
          </Text>
        </Pressable>
      </View>
    </Screen>
  )
}
export default SignUp
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
