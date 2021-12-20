// import React, { useEffect } from "react"
// import * as WebBrowser from "expo-web-browser"
// import * as Facebook from "expo-auth-session/providers/facebook"
// import firebase from "firebase"
// import jwt_decode from "jwt-decode"

// import { ResponseType } from "expo-auth-session"

// import { Button } from "react-native"
// import environment from "../../../config/environment"

// WebBrowser.maybeCompleteAuthSession()

// export default function FBLogin() {
//   const [request, response, promptAsync] = Facebook.useAuthRequest({
//     responseType: ResponseType.Token,
//     clientId: environment.F_WEB_CLIENT,
//   })

//   useEffect(() => {
//     if (response?.type === "success") {
//       const { access_token } = response.params
//       //console.log(`acces_token`, response.params)
//       const provider = new firebase.auth.FacebookAuthProvider()
//       const credential = provider.credential(access_token)
//       // Sign in with the credential from the Facebook user.
//       firebase.auth().signInWithCredential(credential)
//       // -
//     }
//   }, [response])

//   return (
//     <Button
//       disabled={!request}
//       title="FB"
//       onPress={() => {
//         promptAsync()
//       }}
//     />
//   )
// }
import * as React from "react"
import * as WebBrowser from "expo-web-browser"
import * as Facebook from "expo-auth-session/providers/facebook"
import { ResponseType } from "expo-auth-session"

import { Pressable } from "react-native"
import environment from "../../../config/environment"
import firebase from "firebase"
import Icon from "../../components/Icon"
import AppText from "../../components/AppText"
WebBrowser.maybeCompleteAuthSession()

export default function FBLogin() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: environment.F_WEB_CLIENT,
  })

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params

      const provider = new firebase.auth.FacebookAuthProvider()
      const credential = provider.credential(access_token)
      // Sign in with the credential from the Facebook user.
      firebase.auth().signInWithCredential(credential)
    }
  }, [response])

  return (
    <Pressable disabled={!request} onPress={promptAsync}>
      <Icon name="facebook" backgroundColor="#3B5998" />
    </Pressable>
  )
}
