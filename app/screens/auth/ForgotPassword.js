import React, { useState } from "react"
import { View, Text, Pressable } from "react-native"
import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import Screen from "../../components/Screen"
const ForgotPassword = ({ navigation }) => {
  const [mailSent, setmailSent] = useState(false)
  const [username, setusername] = useState("")

  const sendMail = () => {
    // Send confirmation code to user's email
    Auth.forgotPassword(username)
      .then((data) => {
        console.log(data)
        setmailSent(true)
      })
      .catch((err) => {
        console.log(err)
        alert("Utilisateur introuvable")
      })
  }

  const SecondCompo = () => {
    const [code, setcode] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const submit = () => {
      console.log(`newpassword`, newpassword)
      Auth.forgotPasswordSubmit(username, code, newpassword)
        .then((data) => {
          console.log(data)
          navigation.popToTop()
        })
        .catch((err) => console.log(err))
    }
    return (
      <>
        <Text>Modifier le mot de passe</Text>
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
      <Text>Modifier le mot de passe</Text>
      <AppTextInput
        placeholder="Entrer le nom d'utilisateur"
        onChangeText={(t) => setusername(t)}
      />
      <AppButton title="Valider" onPress={() => sendMail()} />
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
