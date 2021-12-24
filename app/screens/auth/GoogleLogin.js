import React, { useEffect } from "react"
import { StyleSheet, Pressable } from "react-native"
import * as Google from "expo-auth-session/providers/google"
import firebase from "firebase"
import jwt_decode from "jwt-decode"
import id_clients from "../../../config/environment"
import Icon from "../../components/Icon"
const GoogleLogin = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: id_clients.G_WEB_CLIENT,
  })
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params
      var { name, email, picture, sub } = jwt_decode(id_token)
      const provider = new firebase.auth.GoogleAuthProvider()
      const credential = provider.credential(id_token)
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              email,
              name,
              image: picture,
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            })
        })
    }
  }, [response])

  return (
    <Pressable disabled={!request} onPress={() => promptAsync()}>
      <Icon name="google" backgroundColor="black" />
    </Pressable>
  )
}

export default GoogleLogin

const styles = StyleSheet.create({})
