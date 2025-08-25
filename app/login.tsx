import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    // Aquí iría tu lógica de autenticación (ej. llamar a una API)
    // Para este ejemplo, solo verificamos que los campos no estén vacíos.
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Usuario y Contraseña son requeridos.");
      return;
    }

    console.log("Username:", username, "Password:", password);
    // Navegamos a la pantalla principal de la app después de un login exitoso.
    router.replace("/(tabs)");
  };

  const styles = getStyles(colorScheme);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <ThemedView style={styles.container}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <ThemedText type="title" style={styles.title}>
          Iniciar Sesión
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#8e8e93"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#8e8e93"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogin}
        >
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </Pressable>

        <Link style={styles.link} href={'/login'}>
          <ThemedText type="link">¿Olvidaste tu contraseña? </ThemedText>
        </Link>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const getStyles = (colorScheme: "light" | "dark" | null | undefined) => {
  const theme = colorScheme ?? "light";
  return StyleSheet.create({
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
    logo: {
      width: 150,
      height: 150,
      marginBottom: 40,
      resizeMode: "contain",
    },
    title: { marginBottom: 30 },
    input: {
      width: "100%",
      height: 50,
      borderColor: Colors[theme].tint,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      color: Colors[theme].text,
      fontSize: 16,
    },
    button: {
      width: "100%",
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
    link: {
      marginTop: 15,
      paddingVertical: 15,
      fontWeight: "bold",
      color: Colors[theme].tint,
      textDecorationLine: "underline",
    },
  });
};
