import { Alert, StyleSheet } from "react-native";

import React from "react";

import { ButtonAction } from "@/components/ButtonAction";
import { DashboardScreen } from "@/components/DashboardScreen";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IcoRequestLoan } from "@/components/ui/IcoRequestLoan";
import { IcoSaving } from "@/components/ui/IcoSaving";
import { IcoWithdraw } from "@/components/ui/IcoWithdraw";

export default function AccionesScreen() {
  const historicoAcciones = [
    { id: 1, fecha: '2024-05-01', monto: 5000, cantidad: 5 },
    { id: 2, fecha: '2024-04-15', monto: 2500, cantidad: 2 },
    { id: 3, fecha: '2024-03-20', monto: 10000, cantidad: 10 },
    { id: 4, fecha: '2024-02-10', monto: 7500, cantidad: 7 },
    { id: 5, fecha: '2024-01-05', monto: 12000, cantidad: 12 },
    { id: 6, fecha: '2024-03-20', monto: 10000, cantidad: 10 },
    { id: 7, fecha: '2024-02-10', monto: 7500, cantidad: 7 },
    { id: 8, fecha: '2024-01-05', monto: 12000, cantidad: 12 },
    { id: 9, fecha: '2024-03-20', monto: 10000, cantidad: 10 },
    { id: 10, fecha: '2024-02-10', monto: 7500, cantidad: 7 },
    { id: 11, fecha: '2024-01-05', monto: 12000, cantidad: 12 },
  ];

  const totalAcciones = historicoAcciones.reduce((total, accion) => total + accion.cantidad, 0);
  const totalMontoAcciones = historicoAcciones.reduce((total, accion) => total + accion.monto, 0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };


  return (
    <DashboardScreen>
      {/** Seccion de detalle de acciones */}
      <ThemedView style={styles.card}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title} type="title">
            HISTORICO DE ACCIONES
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.table}>
          {/* Table Header */}
          <ThemedView style={styles.tableRowHeader}>
            <ThemedText style={styles.tableHeader}>Fecha</ThemedText>
            <ThemedText style={styles.tableHeader}>Monto</ThemedText>
            <ThemedText style={styles.tableHeader}>Cantidad</ThemedText>
          </ThemedView>

          {/* Table Body */}
          {historicoAcciones.map((accion) => (
            <ThemedView key={accion.id} style={styles.tableRow}>
              <ThemedText style={styles.tableCell}>{accion.fecha}</ThemedText>
              <ThemedText style={styles.tableCell}>{formatCurrency(accion.monto)}</ThemedText>
              <ThemedText style={styles.tableCell}>{accion.cantidad}</ThemedText>
            </ThemedView>
          ))}
          {/* Table Footer */}
          <ThemedView style={styles.tableRowFooter}>
            <ThemedText style={styles.tableFooterLabel}># Acciones:</ThemedText>
            <ThemedText style={styles.tableFooterValue}>{totalAcciones}</ThemedText>
            <ThemedText style={styles.tableFooterLabel}>Monto:</ThemedText>
            <ThemedText style={styles.tableFooterValue}>{formatCurrency(totalMontoAcciones)}</ThemedText>
          </ThemedView>

        </ThemedView>
      </ThemedView>


      {/** Seccion de opciones del cliente */}
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
    </DashboardScreen>
  );
}

const styles = StyleSheet.create({
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
    paddingLeft: 10,
    paddingVertical: 5,
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
  },
  table: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  tableRowFooter: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#f2f2f2',
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tableFooterLabel: {
    fontWeight: 'bold',
    marginRight: 20,
    color: '#555'
  },
  tableFooterValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },

});
