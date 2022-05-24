import React from "react";
import { styles } from "./styles";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { Avatar } from "../../components/Avatar";
// Icones
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';

export function Home() {
  type PropTypeBT = {
    style: string;
  };

  const navigation = useNavigation();

  function handleHome() {
    navigation.navigate("SignIn");
  }

  function CalculatorRote() {
    navigation.navigate("Calculator");
  }

  function ComparatorRote() {
    navigation.navigate("Comparator");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar urlImage="https://github.com/Vitor-php.png" />
        <BackButton onPress={handleHome} />
      </View>

      <View>
        <Text style={styles.title}>ESCOLHA:</Text>
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={CalculatorRote}
        >
          <Ionicons style={styles.iconCalculator} name="ios-calculator-outline" size={60} color="white" />
          <Text style={styles.textButtonCalculator}>CALCULADORA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonComparator}
          onPress={ComparatorRote}
        >
          <Entypo style={styles.iconComparator} name="pie-chart" size={60} color="white" />
          <Text style={styles.textButtonComparator}>COMPARADOR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonComparator}
          onPress={ComparatorRote}
        >
          <Entypo style={styles.iconComparator} name="pie-chart" size={60} color="white" />
          <Text style={styles.textButtonComparator}>COMPARADOR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
