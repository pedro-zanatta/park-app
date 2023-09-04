import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import styles from "../../styles/parkDetailsPage";
import { Stack, useSearchParams, useRouter } from "expo-router";
import HeaderBackButton from "../../components/Buttons/HeaderBackButton";
import YoutubeIFrame from "react-native-youtube-iframe";
import MapView, { Marker } from "react-native-maps";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const jsonData = require("../../data/parksData.json");

const ParkDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { width, height } = Dimensions.get("window");
  const [menuTab, setMenuTab] = useState("geral");
  const [isLoading, setIsLoading] = useState(true);
  const [imgActive, setimgActive] = useState(0);
  const [park, setPark] = useState();
  const imagesArray = park?.images;
  const mapRegion = {
    latitude: park?.mapRegion.latitude,
    longitude: park?.mapRegion.longitude,
    latitudeDelta: park?.mapRegion.latitudeDelta,
    longitudeDelta: park?.mapRegion.longitudeDelta,
  };
  const filteredData = jsonData.filter(
    (park) => park.id.toString() === params.id
  );

  useEffect(() => {
    async function loadPark() {
      const park = await filteredData[0];
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
          headerStyle: { backgroundColor: "#3c5c9b" },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <HeaderBackButton onPress={() => router.back()} />,
          headerTitle: "",
        }}
      />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20, paddingBottom: 100 }}>
            <View
              style={{
                alignItems: "center",
                gap: 8,
                flexDirection: "row",
              }}
            >
              <View style={styles.logoBox}>
                <Image
                  source={{
                    uri: park.logo,
                  }}
                  style={{ width: "80%", height: "80%" }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ gap: 8 }}>
                <Text style={{ fontWeight: "600" }}>{park.name}</Text>
                <Text style={{ color: "#8c8d8e" }}>{park.cityState}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
                marginVertical: 60,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.menuButton(menuTab === "geral")}
                onPress={() => setMenuTab("geral")}
              >
                <Text
                  style={{ color: menuTab === "geral" ? "white" : "black" }}
                >
                  Geral
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuButton(menuTab === "contato")}
                onPress={() => setMenuTab("contato")}
              >
                <Text
                  style={{ color: menuTab === "contato" ? "white" : "black" }}
                >
                  Contato
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 40, gap: 24 }}>
              {menuTab === "geral" ? (
                <View style={{ gap: 72 }}>
                  <View style={styles.infoCard}>
                    <View style={{ gap: 8 }}>
                      <Text style={{ fontWeight: "600" }}>Descrição</Text>
                      <Text>{park.description}</Text>
                    </View>
                    <View style={{ gap: 8 }}>
                      <Text style={{ fontWeight: "600" }}>
                        Horário de Funcionanemto
                      </Text>
                      <Text>{park.time}</Text>
                    </View>
                    <View style={{ gap: 8 }}>
                      <Text style={{ fontWeight: "600" }}>
                        Preço do ingresso
                      </Text>
                      <Text>{park.ticketPrice}</Text>
                    </View>
                    <View style={{ gap: 8 }}>
                      <Text style={{ fontWeight: "600" }}>
                        Link do Ingresso
                      </Text>
                      <Text
                        style={{ fontWeight: "500", color: "blue" }}
                        onPress={() => Linking.openURL(`${park.ticketLink}`)}
                      >
                        {park.ticketLink}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: "100%",
                      backgroundColor: "#d5d6d8",
                    }}
                  />
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
                        {imagesArray.map((index) => (
                          <Text
                            key={index}
                            style={{
                              color:
                                imgActive === index ? "#3c5c9b" : "#c4c5c8",
                              fontSize: 32,
                            }}
                          >
                            .
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: "100%",
                      backgroundColor: "#d5d6d8",
                    }}
                  />
                  <View style={{ gap: 16 }}>
                    <Text style={{ fontWeight: "600" }}>Vídeo</Text>
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
                  <View
                    style={{
                      height: 1,
                      width: "100%",
                      backgroundColor: "#d5d6d8",
                    }}
                  />
                  <View style={{ gap: 16 }}>
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ fontWeight: "600" }}>No mapa</Text>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            `https://www.google.com/maps/search/?api=1&query=${park.address}`
                          )
                        }
                      >
                        <FontAwesome5
                          name="map"
                          size={20}
                          color="black"
                          solid
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        height: 200,
                      }}
                    >
                      <MapView region={mapRegion} style={{ height: 250 }}>
                        <Marker coordinate={mapRegion} title="Marker" />
                      </MapView>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.infoCard}>
                  <View style={styles.contactItem}>
                    <FontAwesome5 name="globe" size={20} color="black" solid />
                    <Text
                      style={{ fontWeight: "500", color: "blue", flex: 1 }}
                      onPress={() => Linking.openURL(park.websiteLink)}
                      numberOfLines={1}
                    >
                      {park.websiteLink}
                    </Text>
                  </View>

                  <View style={styles.contactItem}>
                    <FontAwesome5 name="phone" size={20} color="black" solid />
                    <Text
                      style={{ fontWeight: "500", color: "blue" }}
                      onPress={() => Linking.openURL(`tel:${park.phone}`)}
                    >
                      {park.phone}
                    </Text>
                  </View>
                  <View style={styles.contactItem}>
                    <FontAwesome5
                      name="envelope"
                      size={20}
                      color="black"
                      solid
                    />
                    <Text
                      style={{ fontWeight: "500", color: "blue", flex: 1 }}
                      onPress={() => Linking.openURL(`mailTo:${park.email}`)}
                      numberOfLines={1}
                    >
                      {park.email}
                    </Text>
                  </View>
                  <View style={{ gap: 16 }}>
                    <Text style={{ fontWeight: "600" }}>Redes Sociais</Text>
                    <View style={{ flexDirection: "row", gap: 16 }}>
                      <TouchableOpacity
                        style={styles.mediaButton}
                        onPress={() =>
                          Linking.openURL(
                            `https://www.instagram.com/${park.insta}`
                          )
                        }
                      >
                        <FontAwesome5
                          name="instagram"
                          size={20}
                          color="white"
                          solid
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.mediaButton}
                        onPress={() =>
                          Linking.openURL(
                            `https://www.tiktok.com/@${park.tiktok}`
                          )
                        }
                      >
                        <FontAwesome5
                          name="tiktok"
                          size={20}
                          color="white"
                          solid
                        />
                      </TouchableOpacity>
                    </View>
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
