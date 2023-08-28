import { useState } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/homePage";
import ParkCard from "../components/Cards/ParkCard";
import { Stack, useRouter } from "expo-router";
import SearchParkInput from "../components/Inputs/SearchParkInput";

const jsonData = require("../data/parksData.json");

const Home = () => {
  const router = useRouter();
  const [searchedPark, setSearchedPark] = useState("");
  const [menuTab, setMenuTab] = useState("todos");
  const favoriteParks = [];
  const handleCardPress = (item) => {
    router.push(`/park-details/${item.id}`);
  };
  const filteredJsonData =
    searchedPark !== ""
      ? jsonData.filter((park) =>
          park.name.toLowerCase().includes(searchedPark.toLowerCase())
        )
      : jsonData;

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#dbdcde",
          },
          contentStyle: {
            backgroundColor: "white",
            padding: "16px",
          },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: "32px" }}
      >
        <Text style={{ fontWeight: "600" }}>Procure um parque</Text>
        <View style={{ marginTop: "8px" }}>
          <SearchParkInput
            searchedPark={searchedPark}
            setSearchedPark={setSearchedPark}
          />

          <View style={{ marginTop: "32px", gap: "16px" }}>
            <View style={{ flexDirection: "row", gap: "8px" }}>
              <TouchableOpacity
                style={styles.menuButton(menuTab === "todos")}
                onPress={() => setMenuTab("todos")}
              >
                <Text
                  style={{
                    color: menuTab === "todos" ? "black" : "#c4c5c8",
                  }}
                >
                  Todos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuButton(menuTab === "aquaticos")}
                onPress={() => setMenuTab("aquaticos")}
              >
                <Text
                  style={{
                    color: menuTab === "aquaticos" ? "black" : "#c4c5c8",
                  }}
                >
                  Aquáticos
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: "32px", gap: "32px" }}>
              <Text style={{ fontWeight: "600" }}>Lista de parques</Text>
              <FlatList
                data={filteredJsonData}
                keyExtractor={(item) => item?.id}
                horizontal
                style={{ paddingHorizontal: "16px" }}
                renderItem={({ item }) => (
                  <ParkCard park={item} handleCardPress={handleCardPress} />
                )}
                contentContainerStyle={{ columnGap: "50px" }}
              />
            </View>
          </View>
          <View style={{ marginTop: "32px", gap: "32px" }}>
            <Text style={{ fontWeight: "600" }}>Favoritos</Text>
            <View style={{ paddingHorizontal: "16px", gap: "32px" }}>
              {favoriteParks.length === 0 ? (
                <Text style={{ color: "#8c8d8e" }}>
                  Nenhum parque favoritado
                </Text>
              ) : (
                favoriteParks.map((park) => (
                  <ParkCard
                    key={park.id}
                    park={park}
                    handleCardPress={handleCardPress}
                    isHorizontal={true}
                  />
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
