import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";


interface HeadFormProps {
    title: string
}


export default function HeadForm(props: HeadFormProps) {

    const title = props.title ?? 'Credi Rojas';

    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);

    return (

        <ThemedView style={{ width: "100%", flexDirection: "row", alignItems: "flex-end", marginBottom: 20 }}>
            <Image
                source={require("@/assets/images/logo.png")}
                style={styles.logo}
            />
            <ThemedText type="title" style={styles.title}>
                {title}
            </ThemedText>
        </ThemedView>

    )

}


const getStyles = (colorScheme: "light" | "dark" | null | undefined) => {
    return StyleSheet.create({
        title: {},
        logo: {
            alignSelf: "baseline",
            width: 50,
            height: 50,
            marginRight: 10,
            resizeMode: "contain",
        },
    });
};
