import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState } from "react";
import styles from "../../styles/parkDetailsPage";
import { Stack, useSearchParams, useRouter } from "expo-router";
import HeaderBackButton from "../../components/Buttons/HeaderBackButton";

const jsonData = require("../../data/parksData.json");

const ParkDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { width, height } = Dimensions.get("window");
  const [menuTab, setMenuTab] = useState("geral");
  const [imgActive, setimgActive] = useState(0);
  const filteredData = jsonData.filter(
    (park) => park.id.toString() === params.id
  );
  const park = filteredData[0];
  console.log(park, "park");
  const imagesArray = park.images;

  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== imgActive) {
        setimgActive(slide);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#dbdcde" },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <HeaderBackButton onPress={() => router.back()} />,
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: "20px", paddingBottom: 100 }}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: park.logo,
              }}
              style={{ width: "100px", height: "100px" }}
              resizeMode="contain"
            />
            <Text style={{ fontWeight: "600" }}>{park.name}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: "8px" }}>
            <TouchableOpacity
              style={styles.menuButton(menuTab === "geral")}
              onPress={() => setMenuTab("geral")}
            >
              <Text>Geral</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton(menuTab === "contato")}
              onPress={() => setMenuTab("contato")}
            >
              <Text>Contato</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: "40px", gap: "24px" }}>
            {menuTab === "geral" ? (
              <>
                <View style={{ gap: "32px" }}>
                  <Text>Imagens do parque</Text>
                  <View
                    style={{ flex: 3, width: "100%", alignItems: "center" }}
                  >
                    <ScrollView
                      onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      bounces={false}
                      style={{
                        width: width,
                        height: "200px",
                      }}
                    >
                      {imagesArray.map((image, index) => (
                        <Image
                          key={index}
                          source={{ uri: image }}
                          resize="stretch"
                          style={{ width: width, height: "200px" }}
                        />
                      ))}
                    </ScrollView>
                    <View style={{ flexDirection: "row", gap: "8px" }}>
                      {imagesArray.map((image, index) => (
                        <Text
                          key={index}
                          style={{
                            color: imgActive === index ? "red" : "black",
                            fontSize: "32px",
                          }}
                        >
                          .
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
                <View>
                  <Text>No mapa</Text>
                  <MapView />
                </View>
              </>
            ) : (
              <>
                <View>
                  <Text style={{ fontWeight: "600" }}>Descrição</Text>
                  <Text>{park.description}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "600" }}>Website</Text>
                  <Text>{park.websiteLink}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "600" }}>Redes Sociais</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "600" }}>Instagram: </Text>
                    <Text>{park.socialMediaLinks?.insta}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "600" }}>TikTok: </Text>
                    <Text>{park.socialMediaLinks?.tiktok}</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParkDetails;
