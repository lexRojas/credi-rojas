import HeadForm from "@/components/HeadForm";
import { PulsingText } from "@/components/PulsingText";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IcoCalendar } from "@/components/ui/IcoCalendar";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRNHandlers } from "@/hooks/useRHHandlers";
import { toYmdLocal } from "@/scripts/tools";
import { mapSocioFormToPersist, SocioForm } from '@/types/types.crud';
import { SocioFormZ } from "@/types/types.zods";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import z from "zod";

const initialSocioForm: SocioForm = {
  cedula: '',
  nombre: '',
  fechaNacimiento: toYmdLocal(new Date()),
  fechaIngreso: toYmdLocal(new Date()),
  montoAccion: '0',
  multiplicador: 3,
  correo: "",
  telefono: ""
}

type SocioFormErrors = Partial<Record<keyof z.infer<typeof SocioFormZ>, string>>;

export default function Signup() {


  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const [socioForm, setSocioForm] = React.useState(initialSocioForm);
  const [errors, setErrors] = useState<SocioFormErrors>({});
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isDatePickerVisibleFN, setDatePickerVisibilityFN] = useState(false);
  const [isDatePickerVisibleFI, setDatePickerVisibilityFI] = useState(false);

  const { onText, onDateFromText } = useRNHandlers<SocioForm>(setSocioForm);

  const onSubmit = async () => {
    setErrors({});
    // Validación con Zod
    // Zod parse
    const result = SocioFormZ.safeParse(socioForm);
    if (!result.success) {
      // mapea errores campo a campo
      const fieldErrors: SocioFormErrors = {};
      result.error.issues.forEach((issue) => {
        const k = issue.path[0] as keyof SocioFormErrors;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Mapear a persistencia (fechas -> Date, decimales -> string(4))
    const toPersist = mapSocioFormToPersist(socioForm);

    console.log(toPersist)

    try {
      if (toPersist) {

        const response = await fetch('http://192.168.50.240:3000/api/socio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toPersist),
        })

        if (response.ok) {
          setResponseMessage("Registros guardados correctamente")
        } else {

          if (response.status === 400) {
            setResponseMessage("Correo electrónico duplicado ! ")
          } else {
            setResponseMessage("Error al guardar los registros!")
          }

        }

      }
    } catch (error) {
      console.log(error)
    }

  }

  // Handler genérico para el DatePicker (toma el campo específico)
  const handleDateConfirm = (field: keyof SocioForm) => (date: Date) => {
    const formattedDate = toYmdLocal(date);  // Formato YYYY-MM-DD
    setSocioForm(prev => ({ ...prev, [field]: formattedDate }));
    if (field === 'fechaNacimiento') {
      setDatePickerVisibilityFN(false);
    } else if (field === 'fechaIngreso') {
      setDatePickerVisibilityFI(false);
    }
  };

  return (

    <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
      <ThemedView style={styles.container}>
        <HeadForm title="Registro de Usuario" />


        <ScrollView >
          <ThemedView style={styles.field}>
            <ThemedText>Cédula / Identificación</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Cédula"
              placeholderTextColor="#8e8e93"
              value={socioForm.cedula}
              onChangeText={onText('cedula')}
              keyboardType="numeric"
              maxLength={10}

            />
          </ThemedView>
          {errors.cedula &&
            <ThemedText style={styles.helperText}
            > {errors.cedula}
            </ThemedText>}

          <ThemedView style={styles.field}>
            <ThemedText>Nombre</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Nombre Completo"
              placeholderTextColor="#8e8e93"
              value={socioForm.nombre}
              onChangeText={onText('nombre')}
              autoCapitalize="none"
            />
          </ThemedView>
          {errors.nombre &&
            <ThemedText style={styles.helperText}
            > {errors.nombre}
            </ThemedText>}

          <ThemedView style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", gap: 10 }}>

            {/* Fecha Nacimiento */}
            <ThemedView style={styles.field}>
              <ThemedText>Fecha Nacimiento</ThemedText>
              <ThemedView style={{ flexDirection: "row", }}>
                <TextInput style={styles.input_date}
                  placeholder="Fecha Nacimiento"
                  placeholderTextColor="#8e8e93"
                  value={socioForm.fechaNacimiento!}
                  onChangeText={onDateFromText('fechaNacimiento')}
                  editable={false}
                  selectTextOnFocus={false}
                />
                <ThemedView style={styles.ico_date}>
                  <Pressable style={{ zIndex: 1 }}
                    onPress={() => setDatePickerVisibilityFN(true)}
                  >
                    <IcoCalendar color="#ffff" style={{}} />
                  </Pressable>
                </ThemedView>
              </ThemedView>
              {/* Mensaje de error */}
              {errors.fechaNacimiento &&
                <ThemedText style={styles.helperText}
                > {errors.fechaNacimiento}
                </ThemedText>}
            </ThemedView>
            {/* Fecha Ingreso */}
            <ThemedView style={styles.field}>
              <ThemedText>Fecha Ingreso</ThemedText>
              <ThemedView>
                <ThemedView style={{ flexDirection: "row", }}>
                  <TextInput style={styles.input_date}
                    placeholder="Fecha Ingreso"
                    placeholderTextColor="#8e8e93"
                    value={socioForm.fechaIngreso!}
                    onChangeText={onDateFromText('fechaIngreso')}
                    editable={false}
                    selectTextOnFocus={false}
                  />

                  <ThemedView style={styles.ico_date}>
                    <Pressable style={{ zIndex: 1 }}
                      onPress={() => setDatePickerVisibilityFI(true)}
                    >
                      <IcoCalendar />
                    </Pressable>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
              {/* Mensaje de error */}
              {errors.fechaIngreso &&
                <ThemedText style={styles.helperText}
                > {errors.fechaIngreso}
                </ThemedText>}
            </ThemedView>
          </ThemedView>

          {/* Correo eletronico */}
          <ThemedView style={styles.field}>
            <ThemedText>Correo Electrónico</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="micorreo@gmail.com"
              placeholderTextColor="#8e8e93"
              value={socioForm.correo}
              onChangeText={onText('correo')}
              inputMode="email"
            />
          </ThemedView>
          {errors.correo &&
            <ThemedText style={styles.helperText}
            > {errors.correo}
            </ThemedText>}

          {/* Telefono */}
          <ThemedView style={styles.field}>
            <ThemedText>Teléfono</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="85540000"
              placeholderTextColor="#8e8e93"
              value={socioForm.telefono}
              onChangeText={onText('telefono')}
              keyboardType="numeric"
              maxLength={10}

            />
          </ThemedView>
          {errors.telefono &&
            <ThemedText style={styles.helperText}
            > {errors.telefono}
            </ThemedText>}

          {responseMessage &&
            <PulsingText style={styles.responseMessage}
            > {responseMessage}
            </PulsingText>}

        </ScrollView>



        <ThemedView style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={onSubmit}>
            <ThemedText style={styles.buttonText}>Registrarse</ThemedText>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => { /* Cancelar lógica */ }}>
            <ThemedText style={styles.buttonText}>Cancelar</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
      {/* DatePicker Modal para Fecha Nacimiento */}
      <DateTimePickerModal
        isVisible={isDatePickerVisibleFN}
        mode="date"
        display="default"
        onConfirm={handleDateConfirm('fechaNacimiento')}
        onCancel={() => setDatePickerVisibilityFN(false)}
      />

      {/* DatePicker Modal para Fecha Ingreso */}
      <DateTimePickerModal
        isVisible={isDatePickerVisibleFI}
        mode="date"
        display="default"
        onConfirm={handleDateConfirm('fechaIngreso')}
        onCancel={() => setDatePickerVisibilityFI(false)}
      />

    </KeyboardAvoidingView>


  );
}

const getStyles = (colorScheme: "light" | "dark" | null | undefined) => {
  const theme = colorScheme ?? "light";
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors[theme].background },
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    formContainer: {
      width: "100%",
      flexDirection: "column",
    },

    field: {
      fontFamily: "Arial",
      fontWeight: "bold",
      flex: 1,
      width: "100%",
      marginBottom: 15,
      flexDirection: "column",
      gap: 5,
    },
    input: {
      width: "100%",
      height: 40,
      borderColor: Colors[theme].tint,
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 5,
      color: Colors[theme].text,
      fontSize: 14,
    },
    input_date: {
      flex: 1,
      height: 40,
      borderColor: Colors[theme].tint,
      borderWidth: 0.5,
      borderEndWidth: 0,
      borderTopEndRadius: 0,
      borderBottomEndRadius: 0,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 5,
      color: Colors[theme].text,
      fontSize: 14,
    },
    ico_date: {

      height: 40,
      borderColor: Colors[theme].tint,
      borderWidth: 0.5,
      borderStartWidth: 0,
      borderTopEndRadius: 5,
      borderBottomEndRadius: 5,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      paddingHorizontal: 10,
      marginBottom: 5,
      color: Colors[theme].text,
      backgroundColor: Colors[theme].tintIco,
      fontSize: 14,
    },
    helperText: { marginTop: -15, color: 'red', fontSize: 13, },
    button: {
      flex: 1,
      height: 50,
      backgroundColor: Colors[theme].tint,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginTop: 10,
    },
    buttonPressed: {
      opacity: 0.8,
    },
    buttonText: {
      color: theme === "light" ? "#fff" : "#000",
      fontSize: 18,
      fontWeight: "bold",
    },
    responseMessage: {
      width: "100%",
      textAlign: "center",
      fontSize: 14,
      color: "#e70e0eff",

    }
  });
};
