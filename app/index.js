import { Text, View, FlatList, SafeAreaView } from "react-native";
import styles from "../styles/components/homePage";
import ParkCard from "../components/Buttons/Cards/ParkCard";
import { Stack, useRouter } from "expo-router";

const jsonData = require("../data/parksData.json");

const Home = () => {
  const router = useRouter();

  const handleCardPress = (item) => {
    router.push(`/park-details/${item.id}`);
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { bg: "yellow" },
          headerShadowVisible: false,
          headerLeft: () => <Text>left</Text>,
          headerRight: () => <Text>right</Text>,
          headerTitle: "",
        }}
      />
      <View style={styles.mainContainer}>
        <View style={styles.parksContainer}>
          <Text>Lista de parques</Text>
          <FlatList
            data={jsonData}
            keyExtractor={(item) => item?.id}
            horizontal
            renderItem={({ item }) => (
              <ParkCard park={item} handleCardPress={handleCardPress} />
            )}
            contentContainerStyle={{ columnGap: "30px" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
