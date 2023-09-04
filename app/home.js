import { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const jsonData = require("../data/parksData.json");

const Home = () => {
  const router = useRouter();
  const [searchedPark, setSearchedPark] = useState("");
  const [fetchedIds, setFetchedIds] = useState();
  const handleCardPress = (item) => {
    router.push(`/park-details/${item.id}`);
  };
  const filteredJsonData =
    searchedPark !== ""
      ? jsonData
          .filter((park) =>
            park.name.toLowerCase().includes(searchedPark.toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name))
      : jsonData.slice().sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const ids = await AsyncStorage.getAllKeys();
      setFetchedIds(ids);
    } catch (error) {
      console.error("Error retrieving parsedIds:", error);
    }
  };

  const saveFavorite = async (id) => {
    try {
      await AsyncStorage.setItem(JSON.stringify(id), JSON.stringify(id));

      getFavorites();
    } catch (error) {
      console.error("Error storing id:");
    }
  };

  const removeFavorite = async (id) => {
    try {
      await AsyncStorage.removeItem(JSON.stringify(id));
      getFavorites();
    } catch (error) {
      console.error("Error removing id:");
    }
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#3c5c9b",
          },
          contentStyle: {
            backgroundColor: "white",
            padding: 16,
            paddingTop: 0,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: 32, paddingTop: 16 }}
      >
        <Text style={{ fontWeight: "600" }}>Procure um parque</Text>
        <View style={{ marginTop: 8 }}>
          <SearchParkInput
            searchedPark={searchedPark}
            setSearchedPark={setSearchedPark}
          />

          <View style={{ marginTop: 32, gap: 16 }}>
            <View style={{ marginTop: 32, gap: 32 }}>
              <Text style={{ fontWeight: "600" }}>Lista de parques</Text>
              <FlatList
                data={filteredJsonData}
                keyExtractor={(item) => item?.id}
                horizontal
                renderItem={({ item }) => (
                  <ParkCard
                    park={item}
                    handleCardPress={handleCardPress}
                    saveFavorite={saveFavorite}
                    removeFavorite={removeFavorite}
                    fetchedIds={fetchedIds}
                  />
                )}
                contentContainerStyle={{ columnGap: 50, paddingHorizontal: 16 }}
              />
            </View>
          </View>
          <View style={{ marginTop: 32, gap: 32 }}>
            <Text style={{ fontWeight: "600" }}>Favoritos</Text>
            <View style={{ paddingHorizontal: 16, gap: 32 }}>
              {fetchedIds?.length === 0 ? (
                <View>
                  <Text style={{ color: "#8c8d8e" }}>
                    Nenhum parque favoritado
                  </Text>
                </View>
              ) : (
                fetchedIds?.map((id) => {
                  const matchingParks = filteredJsonData.filter(
                    (park) => park.id === parseInt(id)
                  );

                  const sortedMatchingParks = matchingParks.sort((a, b) =>
                    a.name.localeCompare(b.name)
                  );

                  return sortedMatchingParks.map((park) => (
                    <ParkCard
                      key={park.id}
                      park={park}
                      handleCardPress={handleCardPress}
                      isHorizontal={true}
                      fetchedIds={fetchedIds}
                    />
                  ));
                })
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
