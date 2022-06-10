import React, { useState } from 'react';
import { View, Text, Pressable, Platform, Image } from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import colors from '../../../config/colors';
import Screen from '../../components/Screen';
import ErrorMessage from '../../components/ErrorMessage';
import Firebase from '../../../config/firebase';
import GoogleLogin from './GoogleLogin';
import FBLogin from './FBLogin';
import Separator from '../../components/Separator';
import AppText from '../../components/AppText';
import styles from './style';
import { StackActions } from '@react-navigation/native';
import AppleLogin from './AppleLogin';
import { useDispatch } from 'react-redux';
import { logInAnon } from '../../../redux/actions';
const auth = Firebase.auth();
WebBrowser.maybeCompleteAuthSession();
const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const OnPressRightIcon = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
        navigation.dispatch(StackActions.replace('Root'));
        dispatch(loginUser);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };
  const onAnonymousLogin = async () => {
    try {
      await auth.signInAnonymously().then((response) => {
        navigation.dispatch(StackActions.replace('Root'));
      });
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <Screen style2={styles.container}>
      <Image
        style={{ width: 100, height: 100, alignSelf: 'center' }}
        source={require('../../../assets/icon2.png')}
      />
      <Text style={styles.title}>Bonjour</Text>
      <Text style={styles.subtitle}>
        Veuillez vous connecter pour utiliser Wanted
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
        style={{ width: '100%', paddingHorizontal: 16, marginBottom: 32 }}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotPasswordButtonText}>Mot de passe oublié</Text>
      </Pressable>
      <AppButton title="Connexion" onPress={onLogin} width={'45%'} />
      <AppButton
        title="Ignorer"
        color="white"
        text="primary"
        width={'45%'}
        onPress={onAnonymousLogin}
      />
      <View style={styles.footerButtonContainer}>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: colors.secondary, fontSize: 16 }}>
            Pas de compte ? S'inscrire
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
  );
};
export default Login;
