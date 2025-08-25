import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IcoChart } from "@/components/ui/IcoChart";
import { IcoHome } from "@/components/ui/IcoHome";
import { IcoKeyLogin } from "@/components/ui/IcoKeyLogin";
import { IcoLoan } from "@/components/ui/IcoLoan";
import { IcoMoney } from "@/components/ui/IcoMoney";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => (
              <IcoHome size={28} color={color} />

            ),
          }}
        />
        <Tabs.Screen name="acciones"
          options={{
            title: "Acciones",
            tabBarIcon: ({ color }) => (
              <IcoMoney size={28} color={color} />

            ),
          }} />

        <Tabs.Screen name="prestamos"
          options={{
            title: "Prestamos",
            tabBarIcon: ({ color }) => (
              <IcoLoan size={28} color={color} />

            ),
          }} />

        <Tabs.Screen name="dividendos"
          options={{
            title: "Dividendos",
            tabBarIcon: ({ color }) => (
              <IcoChart size={28} color={color} />

            ),
          }} />

        <Tabs.Screen
          name="login_redirect"
          options={{
            title: "Login",
            tabBarIcon: ({ color }) => (
              <IcoKeyLogin size={28} color={color} />

            ),
          }}
        />
      </Tabs>
  );
}
