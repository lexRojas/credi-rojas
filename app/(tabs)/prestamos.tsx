import { Alert, StyleSheet } from "react-native";

import React from "react";

import { ButtonAction } from "@/components/ButtonAction";
import { DashboardScreen } from "@/components/DashboardScreen";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IcoRequestLoan } from "@/components/ui/IcoRequestLoan";
import { IcoSaving } from "@/components/ui/IcoSaving";
import { IcoWithdraw } from "@/components/ui/IcoWithdraw";

export default function PrestamosScreen() {
  const historicoPrestamos = [
    { id: 1, fecha_inicio: '2023-01-15', plazo: 24, monto_solicitado: 500000, monto_pagago_capital: 100000, monto_pagado_intereses: 25000, monto_pagado_multas: 0, saldo: 400000 },
    { id: 2, fecha_inicio: '2023-06-20', plazo: 12, monto_solicitado: 250000, monto_pagago_capital: 50000, monto_pagado_intereses: 10000, monto_pagado_multas: 5000, saldo: 200000 },
    { id: 3, fecha_inicio: '2024-02-10', plazo: 36, monto_solicitado: 1000000, monto_pagago_capital: 75000, monto_pagado_intereses: 30000, monto_pagado_multas: 0, saldo: 925000 },
    { id: 4, fecha_inicio: '2024-05-01', plazo: 48, monto_solicitado: 1500000, monto_pagago_capital: 25000, monto_pagado_intereses: 50000, monto_pagado_multas: 0, saldo: 1475000 },
  ];

  const totalPrestamos = historicoPrestamos.length;
  const montoTotalPrestamos = historicoPrestamos.reduce((sum, p) => sum + p.monto_solicitado, 0);
  const totalPagadoCapital = historicoPrestamos.reduce((sum, p) => sum + p.monto_pagago_capital, 0);
  const totalPagadoIntereses = historicoPrestamos.reduce((sum, p) => sum + p.monto_pagado_intereses, 0);
  const totalPagadoMultas = historicoPrestamos.reduce((sum, p) => sum + p.monto_pagado_multas, 0);
  const saldoGlobal = historicoPrestamos.reduce((sum, p) => sum + p.saldo, 0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <DashboardScreen>
      <ThemedView style={styles.card}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title} type="title">
            HISTORICO DE PRESTAMOS
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.table}>
          <ThemedView style={styles.tableRowHeader}>
            <ThemedText style={styles.tableHeader}>Fecha Inicio</ThemedText>
            <ThemedText style={styles.tableHeader}>Plazo</ThemedText>
            <ThemedText style={styles.tableHeader}>Monto</ThemedText>
            <ThemedText style={styles.tableHeader}>Saldo</ThemedText>
          </ThemedView>

          {historicoPrestamos.map((prestamo) => (
            <ThemedView key={prestamo.id} style={styles.tableRow}>
              <ThemedText style={styles.tableCell}>{prestamo.fecha_inicio}</ThemedText>
              <ThemedText style={styles.tableCell}>{`${prestamo.plazo} meses`}</ThemedText>
              <ThemedText style={styles.tableCell}>{formatCurrency(prestamo.monto_solicitado)}</ThemedText>
              <ThemedText style={styles.tableCell}>{formatCurrency(prestamo.saldo)}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.summaryContainer}>
          <ThemedView style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Total de préstamos:</ThemedText>
            <ThemedText style={styles.summaryValue}>{totalPrestamos}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Monto total de préstamos:</ThemedText>
            <ThemedText style={styles.summaryValue}>{formatCurrency(montoTotalPrestamos)}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Total pagado (Capital):</ThemedText>
            <ThemedText style={styles.summaryValue}>{formatCurrency(totalPagadoCapital)}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Total pagado (Intereses):</ThemedText>
            <ThemedText style={styles.summaryValue}>{formatCurrency(totalPagadoIntereses)}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Total pagado (Multas):</ThemedText>
            <ThemedText style={styles.summaryValue}>{formatCurrency(totalPagadoMultas)}</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.summaryRow, styles.summaryTotalRow]}>
            <ThemedText style={styles.summaryTotalLabel}>Saldo global a la fecha:</ThemedText>
            <ThemedText style={styles.summaryTotalValue}>{formatCurrency(saldoGlobal)}</ThemedText>
          </ThemedView>
        </ThemedView>

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
    alignItems: 'center',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    fontSize:13,
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize:10,
  },
  summaryContainer: {
    padding: 10,
    marginVertical: 5,
    marginTop: 0,
    
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryTotalRow: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
    paddingTop: 8,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d9534f',
  },

});
