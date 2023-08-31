import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import styles from "../../styles/parkDetailsPage";
import { Stack, useSearchParams, useRouter } from "expo-router";
import HeaderBackButton from "../../components/Buttons/HeaderBackButton";
import YoutubeIFrame from "react-native-youtube-iframe";
import MapView, { Marker } from "react-native-maps";

const jsonData = require("../../data/parksData.json");

const ParkDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const [menuTab, setMenuTab] = useState("geral");
  const [isLoading, setIsLoading] = useState(true);
  const [imgActive, setimgActive] = useState(0);
  const [park, setPark] = useState();
  const imagesArray = park?.images;
  const mapRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const filteredData = jsonData.filter(
    (park) => park.id.toString() === params.id
  );

  useEffect(() => {
    async function loadPark() {
      const park = await filteredData[0];
      console.log(park);
      setPark(park);
      setIsLoading(false);
    }
    loadPark();
  }, []);

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
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20, paddingBottom: 100 }}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: park.logo,
                }}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
              <Text style={{ fontWeight: "600" }}>{park.name}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                marginTop: 20,
              }}
            >
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

            <View style={{ marginTop: 40, gap: 24 }}>
              {menuTab === "geral" ? (
                <View style={{ gap: 72 }}>
                  <View style={{ gap: 16 }}>
                    <Text style={{ fontWeight: "600" }}>Imagens do parque</Text>
                    <View
                      style={{ flex: 3, width: "100%", alignItems: "center" }}
                    >
                      <ScrollView
                        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                        scrollEventThrottle
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        bounces={false}
                        style={{
                          width: width,
                          height: 200,
                        }}
                      >
                        {imagesArray.map((image, index) => (
                          <Image
                            key={index}
                            source={{ uri: image }}
                            resize="stretch"
                            style={{ width: width, height: 200 }}
                          />
                        ))}
                      </ScrollView>
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        {imagesArray.map((image, index) => (
                          <Text
                            key={index}
                            style={{
                              color: imgActive === index ? "red" : "black",
                              fontSize: 32,
                            }}
                          >
                            .
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View style={{ gap: 16 }}>
                    <Text style={{ fontWeight: "600" }}>Video</Text>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        height: 195,
                      }}
                    >
                      <YoutubeIFrame height={195} videoId={park.video} />
                    </View>
                  </View>
                  <View style={{ gap: 16 }}>
                    <Text style={{ fontWeight: "600" }}>No mapa</Text>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        height: 200,
                      }}
                    >
                      <MapView region={mapRegion} style={{ height: 200 }}>
                        <Marker coordinate={mapRegion} title="Marker" />
                      </MapView>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{ gap: 72 }}>
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
                  <View>
                    <Text style={{ fontWeight: "600" }}>Website</Text>
                    <Text>{park.time}</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: "600" }}>Website</Text>
                    <Text>{park.ticketPrice}</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: "600" }}>Website</Text>
                    <Text>{park.time}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ParkDetails;
