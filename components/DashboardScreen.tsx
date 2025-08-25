import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import React from "react";

type DashboardScreenProps = {
    children: React.ReactNode;
};

export function DashboardScreen({ children }: DashboardScreenProps) {
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
            {children}
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
});