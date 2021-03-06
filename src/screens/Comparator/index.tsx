import React, { ReactNode, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "../../components/Avatar";
import { BackButton } from "../../components/BackButton";
import SelectDropdown from "react-native-select-dropdown";
import { calcComparator } from "../../controls/comparatorController";
interface ISelicRate {
  data: String;
  valor: String;
}
interface IComparatorProps {
  route: any;
  children: ReactNode;
}
interface IAxiosGet {
  id: string;
  resultados: [
    {
      series: [
        {
          serie: {
            202204: string;
          };
        }
      ];
    }
  ];
}

export function Comparator({ route }: IComparatorProps) {
  const { token } = route.params;

  const navigation = useNavigation();

  const [timeInput, setTimeInput] = useState(0);
  const [ipcaRate, setIpcaRate] = useState(0);
  const [selicRate, setSelicRate] = useState<ISelicRate[]>([]);

  const [valueMonth, setValueMonth] = useState("");
  const [typeSelect, setTypeSelect] = useState("Selic");
  const [yearsOrMounthTime, setYearsOrMounthTime] = useState("Anos");

  const [valueTotalIpca, setValueTotalIpca] = useState(0);
  const [valueTotalSelic, setValueTotalSelic] = useState(0);
  const [valueTotalSavings, setValueTotalSavings] = useState(0);
  const [valueTotalCdi, setValueTotalCdi] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalInterrogation, setModalInterrogation] = useState(false);

  function handleHome() {
    navigation.navigate("Home", { token });
  }

  useEffect(() => {
    // fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/10?formato=json')
    //   .then(response => response.json())
    //   .then(data => data)

    //API SELIC
    axios
      .get(
        "https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/10?formato=json"
      )
      .then((response) => setSelicRate(response.data));

    //API IPCA
    axios
      .get<IAxiosGet[]>(
        "https://servicodados.ibge.gov.br/api/v3/agregados/7060/periodos/202001%7C202204/variaveis/69?localidades=N1[all]&classificacao=315[7169]"
      )
      .then((response) =>
        setIpcaRate(+response.data[0].resultados[0].series[0].serie[202204])
      );
  }, []);

  const latestSelicRate = selicRate[selicRate.length - 1];

  // Op????es dos select
  const time = ["Meses", "Anos"];
  const type = ["Selic", "IPCA", "CDI", "Poupan??a"];

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Avatar />
          <BackButton onPress={handleHome} />
        </SafeAreaView>
        <Text style={styles.title}>Comparador</Text>

        <SafeAreaView>
          <TouchableOpacity
            onPress={() => {
              setModalInterrogation(true);
            }}
          >
            <AntDesign
              name="questioncircleo"
              size={20}
              style={styles.iconInterrogation}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalInterrogation}
        >
          <SafeAreaView style={styles.viewModalInterrogation}>
            <Text style={styles.textModalInterrogation}>
              Este ?? o comparador de investimentos, voc?? simula alguns aportes e
              ele monstra qual seria seu lucro em cada produto financeiro.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalInterrogation(false);
              }}
            >
              <Text></Text>
              <AntDesign
                name="closecircle"
                color="red"
                size={20}
                style={styles.closeModalInterrogationIcon}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

        <SafeAreaView style={styles.viewInitialValue}>
          <Text style={styles.InitialValue}>
            VALOR{"\n"}
            MENSAL
          </Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            value={valueMonth}
            onChangeText={(text) => {
              setValueMonth(text);
            }}
            style={styles.inputInitialValue}
            placeholder="R$00,00"
            placeholderTextColor={"#808080"}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.viewInitialValue}>
          <Text style={styles.timeText}>TEMPO</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            onChangeText={(text) => {
              setTimeInput(Number(text));
            }}
            style={styles.inputTime}
            placeholder="1"
            placeholderTextColor={"#808080"}
          />
          <SelectDropdown
            data={time}
            defaultButtonText={"Anos"}
            onSelect={(selectedItem) => {
              setYearsOrMounthTime(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.viewInitialValue}>
          <Text style={styles.typeText}>TIPO</Text>
          <TextInput
            editable={false}
            style={styles.inputType}
            placeholder={typeSelect}
            placeholderTextColor={"#000000"}
          />
          <SelectDropdown
            data={type}
            defaultButtonText={"Selic"}
            onSelect={(selectedItem, index) => {
              setTypeSelect(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </SafeAreaView>

        <TouchableOpacity
          style={styles.buttonCalculate}
          onPress={() =>
            calcComparator({
              ipcaRate,
              selicRate: +latestSelicRate.valor,
              timeInput,
              valueMonth,
              yearsOrMounthTime,
              setValueTotalCdi,
              setValueTotalIpca,
              setValueTotalSavings,
              setValueTotalSelic,
              setModal,
            })
          }
        >
          <Text style={styles.textCalculate}>CALCULAR</Text>
        </TouchableOpacity>

        <SafeAreaView>
          <Modal animationType="slide" transparent={true} visible={modal}>
            <SafeAreaView style={styles.viewModal}>
              <Text style={styles.total}>TOTAL:</Text>
              <SafeAreaView style={styles.line}></SafeAreaView>
              <SafeAreaView style={styles.boxAndText}>
                <SafeAreaView style={styles.viewTopBoxSelic}>
                  <Text style={styles.textTopBoxSelic}>TESOURO SELIC</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.box1}>
                  <Text style={styles.textBox}>
                    Valor Total: R$ {Number(valueTotalSelic).toFixed(2)}
                  </Text>
                </SafeAreaView>
              </SafeAreaView>

              <SafeAreaView style={styles.boxAndText}>
                <SafeAreaView style={styles.viewTopBoxIpca}>
                  <Text style={styles.textTopBoxIpca}>TESOURO IPCA</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.box2}>
                  <Text style={styles.textBox}>
                    Valor Total: R$ {Number(valueTotalIpca).toFixed(2)}
                  </Text>
                </SafeAreaView>
              </SafeAreaView>

              <SafeAreaView style={styles.boxAndText}>
                <SafeAreaView style={styles.viewTopBoxCdi}>
                  <Text style={styles.textTopBoxCdi}>CDI</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.box3}>
                  <Text style={styles.textBox}>
                    Valor Total: R$ {Number(valueTotalCdi).toFixed(2)}
                  </Text>
                </SafeAreaView>
              </SafeAreaView>

              <SafeAreaView style={styles.boxAndText}>
                <SafeAreaView style={styles.viewTopBoxSavings}>
                  <Text style={styles.textTopBoxSavings}>POUPAN??A</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.box4}>
                  <Text style={styles.textBox}>
                    Valor Total: R$ {Number(valueTotalSavings).toFixed(2)}
                  </Text>
                </SafeAreaView>
              </SafeAreaView>
              <TouchableOpacity
                onPress={() => {
                  setModal(false);
                }}
              >
                <Text></Text>
                <AntDesign
                  name="closesquare"
                  color="red"
                  size={25}
                  style={styles.closeModalIcon}
                />
              </TouchableOpacity>
            </SafeAreaView>
          </Modal>
        </SafeAreaView>
      </SafeAreaView>
    </ScrollView>
  );
}
