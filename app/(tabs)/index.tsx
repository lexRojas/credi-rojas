import { Image } from "expo-image";
import { Text, SectionList, StatusBar, StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const DATA = [
  {
    title: "RESUMEN DE MOVIMIENTOS",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "ACCIONES",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#32525c", dark: "lightgray" }}
      headerImage={
        <Image
          source={require("@/assets/images/banner2.png")}
          style={styles.reactLogo}
        />
      }
    >
      {/* <View style={styles.container}>
        <SectionList
          style={styles.sectionList}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <ThemedText style={styles.title}>{item}</ThemedText>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <ThemedText style={styles.header}>{title}</ThemedText>
          )}
        />
      </View> */}

      {/**  Tarjeta Principal */}
      <ThemedView style={styles.card}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title} type="title">
            RESUMEN DE MOVIMIENTOS
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card_item}>
          <ThemedView style={styles.card_logo}>
            <Image
              source={require("@/assets/images/money2.png")}
              style={styles.item_logo}
            />
          </ThemedView>
          <ThemedView style={styles.card_detail}>
            <ThemedView style={styles.card_detail_title}>
              <ThemedText style={styles.card_detail_title_text}>Acciones</ThemedText>
            </ThemedView>
            <ThemedView style={styles.card_detail_data}>
              <ThemedView> <ThemedText style={styles.card_detail_text}> 45,522.00</ThemedText></ThemedView>
              <ThemedView> <ThemedText> ></ThemedText>  </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: "lightgray",
    padding: 0,
    flexDirection: "column",
  },
  card_detail_title: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical:10,
  },
    card_detail_title_text: {
    fontSize:24,
    color:"#2e2e2eff",
    fontWeight:"bold"

  },
  card_detail: {
    flexDirection: "column",
    flex:1

  },
  card_detail_data: {
    flexDirection: "row",
    justifyContent:"space-evenly"

 },
   card_detail_text: {
    fontSize:24,
    color:"#054d0dff",
    fontWeight:"bold"

  },

  card_item: {
    flexDirection: "row",
    paddingVertical:10,
  },

  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: "#ededed",
  },

  reactLogo: {
    height: 100,
    width: 200,
    top: 40,
    resizeMode: "contain",
  },

  title: {
    fontSize: 24,
    color: "#959595",
  },
  item_logo: {
    height: 50,
    width: 200,
    resizeMode: "center",

  },
  card_logo: {
    width: 100,
        position:"relative",
    alignItems:"center",
    justifyContent:"center" 
  },
});
