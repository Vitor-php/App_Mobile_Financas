import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import * as AuthSession from 'expo-auth-session';

import { ButtonIcon } from "../../components/SignIn/ButtonIcon";
import IllustrationImg from "../../assets/illustration.png";
import { styles } from "./styles";

  export function SignIn() {
    const navigation = useNavigation();
    
    async function handleSignIn() {
      const CLIENT_ID = '463150100913-d7dheaqa3iuq6g4i1pne90mrb5184ifc.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@vitor3124/mobile';
      const RESPONSE_YPE = 'token';
      const SCOPE = encodeURI('profile email');


     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_YPE}&scope=${SCOPE}`;
     const response = await AuthSession.startAsync({ authUrl });
     console.log(response);

      navigation.navigate('Home');
    }

  return (
    <View style={styles.container}>
    <Image source={IllustrationImg} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>
          Aprender finanças {`\n`}
          nunca foi tão fácil!
        </Text>
        <Text style={styles.subtitle}>
          Aprenda sobre finanças do básico {`\n`}
          ao avançado tudo em um só lugar.
        </Text>
        <ButtonIcon title="Entrar com Google" onPress={handleSignIn} />
      </View>
    </View>
  );
}



       