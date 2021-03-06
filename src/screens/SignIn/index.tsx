import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, Image, TouchableOpacity } from "react-native";
import * as AuthSession from "expo-auth-session";

import { ButtonIcon } from "../../components/SignIn/ButtonIcon";
import IllustrationImg from "../../assets/illustration.png";
import { styles } from "./styles";

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  };
};

export function SignIn() {
  const navigation = useNavigation();

  async function handleSignIn() {
    const CLIENT_ID =
      "463150100913-d7dheaqa3iuq6g4i1pne90mrb5184ifc.apps.googleusercontent.com";
    const REDIRECT_URI = "https://auth.expo.io/@vitor3124/mobile";
    const RESPONSE_YPE = "token";
    const SCOPE = encodeURI("profile email");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_YPE}&scope=${SCOPE}`;
    const { type, params } = (await AuthSession.startAsync({
      authUrl,
    })) as AuthResponse;


    if (type === "success") {
      navigation.navigate("Home", { token: params.access_token });
    }
   }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.viewTitle}>
      <Text style={styles.title1}>B</Text><Text style={styles.title2}>est</Text><Text style={styles.title3}>F</Text><Text style={styles.title4}>inance</Text>
      </SafeAreaView>
      <Image source={IllustrationImg} style={styles.image} />
      <SafeAreaView style={styles.content}>
        <Text style={styles.title}>
          Educação Financeira {`\n`}
          na palma da sua mão!
        </Text>
        <ButtonIcon title="Entrar com Google" onPress={handleSignIn} />
      </SafeAreaView>
      <TouchableOpacity>
      <Text style={styles.contactUs}>Fale Conosco</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
