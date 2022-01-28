import React from "react"
import * as Crypto from "expo-crypto"
import * as AppleAuthentication from "expo-apple-authentication"
const AppleLogin = () => {
  const loginWithApple = async () => {
    const csrf = Math.random().toString(36).substring(2, 15)
    const nonce = Math.random().toString(36).substring(2, 10)
    const hashedNonce = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      nonce
    )
    const appleCredential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
      state: csrf,
      nonce: hashedNonce,
    })
    const { identityToken, email, state } = appleCredential
  }
  // This should go in state
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: 20, height: 44 }}
      onPress={loginWithApple}
    />
  )
}
export default AppleLogin
