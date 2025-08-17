import React from 'react';
import { Pressable, StyleSheet, type PressableProps } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type ButtonActionProps = PressableProps & {
  icon: React.ReactNode;
  color?: string;
  size?: number;
  label?: string;
};

export function ButtonAction({
  icon,
  color = '#007AFF', // Color azul por defecto
  size = 60,
  label = "action",
  ...rest
}: ButtonActionProps) {
  // Los estilos se crean dentro para usar las props dinámicas de tamaño y color
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2, // Esto lo hace un círculo perfecto
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      // Sombra para darle profundidad
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    pressed: {
      opacity: 0.8,
    },
    view: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 2,
      gap: 5,
      
      

    }
  });

  return (
    <ThemedView style={styles.view}>
      <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} {...rest}>
        {icon}

      </Pressable>
      {label && <ThemedText type="defaultSemiBold">{label}</ThemedText>}
    </ThemedView>
  );
}
