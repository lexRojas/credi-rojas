
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IcoArrow } from "@/components/ui/ico-arrow";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

// Un mapa para asociar nombres de íconos con sus archivos de imagen.
// Esto hace que el componente sea más flexible.
const ICON_MAP = {
    acciones: require("@/assets/images/money2.png"),
    prestamos: require("@/assets/images/prestamos.png"), // y esta también
    dividendos: require("@/assets/images/dividendos.png"),
};

// Creamos un tipo basado en las llaves del mapa de íconos para mayor seguridad.
export type IconoNombre = keyof typeof ICON_MAP;

export type TarjetaDatosProps = {
    icono?: IconoNombre;
    titulo: string;
    monto: number;
    moneda: 'USD' | 'CRC';
};

export function TarjetaDatos({ icono = "acciones", titulo, monto, moneda }: TarjetaDatosProps) {

    const montoFormateado = new Intl.NumberFormat(
        moneda === 'CRC' ? 'es-CR' : 'en-US',
        { style: 'currency', currency: moneda }
    ).format(monto);

    return (
        <>
            {/** Tajerta de Datos  */}
            <ThemedView style={styles.card_item}>

                {/** Icono descriptivo  */}
                <ThemedView style={styles.card_logo}>
                    <Image
                        source={ICON_MAP[icono]}
                        style={styles.item_logo}
                    />
                </ThemedView>

                {/** Detalle de datos  */}
                <ThemedView style={styles.card_detail}>
                    <ThemedView style={styles.card_detail_title}>
                        <ThemedText style={styles.card_detail_title_text}>
                            {titulo}
                        </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.card_detail_data}>
                        <ThemedView>
                            <ThemedText style={styles.card_detail_text}>
                                {montoFormateado}
                            </ThemedText>
                        </ThemedView>

                    </ThemedView>
                </ThemedView>

                {/** Icono link de detalle  */}
                <ThemedView style={styles.card_link}>
                    <IcoArrow color="#f50000ff" size={38} />
                </ThemedView>
            </ThemedView>

        </>

    )
}

const styles = StyleSheet.create({
    card_detail_title: {
        flexDirection: "row",
        paddingVertical: 2,
    },
    card_detail_title_text: {
        fontSize: 20,
        color: "#b9b9b9ff",
        fontWeight: "bold",
        textAlign: "left",
    },
    card_detail: {
        flexDirection: "column",
        flex: 1,
        borderBottomWidth: 3,
        borderColor: "#d1d1d1ff",
        paddingBottom: 5
    },
    card_detail_data: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    card_detail_text: {
        fontSize: 18,
        color: "#277530ff",
        fontWeight: "bold",
    },

    card_item: {
        flexDirection: "row",
        paddingVertical: 10,
    },


    reactLogo: {
        height: 100,
        width: 200,
        top: 40,
        resizeMode: "contain",
    },

    item_logo: {
        height: 50,
        width: 200,
        resizeMode: "center",
    },
    card_logo: {
        width: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    card_link: {
        width: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 3,
        borderColor: "#d1d1d1ff",
    },
});
