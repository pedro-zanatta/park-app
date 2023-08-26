import { useState } from "react";
import { Text, View, FlatList, SafeAreaView, ScrollView } from "react-native";
import styles from "../styles/components/homePage";
import ParkCard from "../components/Cards/ParkCard";
import { Stack, useRouter } from "expo-router";
import SearchParkInput from "../components/Inputs/SearchParkInput";

const jsonData = require("../data/parksData.json");

const Home = () => {
  const router = useRouter();
  const [searchedPark, setSearchedPark] = useState("");
  console.log(searchedPark, "park");
  const handleCardPress = (item) => {
    router.push(`/park-details/${item.id}`);
  };
  const filteredJsonData =
    searchedPark !== ""
      ? jsonData.filter((park) =>
          park.name.toLowerCase().includes(searchedPark.toLowerCase())
        )
      : jsonData;

  console.log(filteredJsonData, "fitere");

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: {},
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: "16px" }}>
          <SearchParkInput
            searchedPark={searchedPark}
            setSearchedPark={setSearchedPark}
          />
          <View>
            <Text>Lista de parques</Text>
            <FlatList
              data={filteredJsonData}
              keyExtractor={(item) => item?.id}
              horizontal
              renderItem={({ item }) => (
                <ParkCard park={item} handleCardPress={handleCardPress} />
              )}
              contentContainerStyle={{ columnGap: "30px" }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
