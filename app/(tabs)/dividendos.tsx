import { Image } from "expo-image";
import { Alert, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import React from "react";

import { ButtonAction } from "@/components/ButtonAction";
import { TarjetaDatos } from "@/components/TarjetaDatos";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IcoRequestLoan } from "@/components/ui/IcoRequestLoan";
import { IcoSaving } from "@/components/ui/IcoSaving";
import { IcoWithdraw } from "@/components/ui/IcoWithdraw";


export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#32525c", dark: "lightgray" }}
      headerImage={
        <Image
          source={require("@/assets/images/banner.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.card}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title} type="title">
            RESUMEN DE MOVIMIENTOS
          </ThemedText>
        </ThemedView>

        <TarjetaDatos titulo="Acciones" monto={45522.00} moneda="CRC" icono="acciones" />
        <TarjetaDatos titulo="Préstamos" monto={12300.50} moneda="CRC" icono="prestamos" />
        <TarjetaDatos titulo="Dividendos" monto={2300.50} moneda="CRC" icono="dividendos" />

      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title} type="title">
            QUE DESEA HACER...
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.actionsContainer}>
          <ButtonAction color="#34C759" label="Solicitar Préstamo" icon={<IcoRequestLoan size={30} />} onPress={() => Alert.alert('Acción', 'Botón de Solicitar Préstamo presionado')} />
          <ButtonAction color="#FF9500" label="Pagar Préstamo" icon={<IcoWithdraw size={30} />} onPress={() => Alert.alert('Acción', 'Botón de Pagos presionado')} />
          <ButtonAction color="#5856D6" label="Comprar Acción" icon={<IcoSaving size={30} />} onPress={() => Alert.alert('Acción', 'Botón de Retirar presionado')} />
        </ThemedView>


      </ThemedView>



    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({

  reactLogo: {
    height: 100,
    width: 200,
    top: 40,
    resizeMode: "contain",
  },

  card: {
    borderWidth: 0,
    borderColor: "lightgray",
    padding: 0,
    gap: 0,
    flexDirection: "column",

  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    paddingLeft: 10,
    paddingVertical: 0,
    backgroundColor: "#ededed",
  },
  title: {
    fontSize: 15,
    color: "#959595",
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    width: '100%',
  }

});
