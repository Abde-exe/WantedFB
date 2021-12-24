import React, { useState } from "react"
import { View, Text, Pressable, Alert } from "react-native"
import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import Screen from "../../components/Screen"
import styles from "./style"
import AppText from "../../components/AppText"
import firebase from "firebase"
const ForgotPassword = ({ navigation }) => {
  const [mailSent, setmailSent] = useState(false)
  const [email, setemail] = useState("")

  const sendMail = (email) => {
    console.log(`email`, email)

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          `Un mail de réinitialisation a été envoyé à l'adresse ${email}`
        )
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        console.log(`error`, error.code + error.message)
        if (error.code == "auth/user-not-found")
          Alert.alert(`Il n'existe pas de compte associé à l'adresse ${email}
          `)
        else if (error.code == "auth/invalid-email")
          Alert.alert("Veuillez entrer une adresse mail valide")
      })
  }

  const SecondCompo = () => {
    const [code, setcode] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const submit = () => {
      console.log(`newpassword`, newpassword)
      Auth.forgotPasswordSubmit(email, code, newpassword)
        .then((data) => {
          console.log(data)
          navigation.popToTop()
        })
        .catch((err) => console.log(err))
    }
    return (
      <>
        <Text style={styles.subtitle}>Modifier le mot de passe</Text>
        <AppTextInput
          placeholder="Code de confirmation"
          onChangeText={(t) => setcode(t)}
        />
        <AppTextInput
          placeholder="Nouveau mot de passe"
          onChangeText={(t) => setnewpassword(t)}
        />
        <AppButton title="Valider" onPress={() => submit()} />
      </>
    )
  }
  return (
    <Screen>
      <Text style={styles.subtitle}>Veuillez entrer votre adresse email</Text>
      <AppTextInput placeholder="Email" onChangeText={(t) => setemail(t)} />
      <AppButton title="Valider" onPress={() => sendMail(email)} />
      <AppButton
        color="white"
        text="primary"
        title="Retour"
        onPress={() => navigation.goBack()}
      />
      {mailSent && <SecondCompo />}
    </Screen>
  )
}

export default ForgotPassword
