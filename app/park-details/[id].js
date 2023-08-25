import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { Stack, useSearchParams, useRouter } from "expo-router";
import HeaderBackButton from "../../components/Buttons/HeaderBackButton";

const jsonData = require("../../data/parksData.json");

const ParkDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const filteredData = jsonData.filter(
    (park) => park.id.toString() === params.id
  );
  const park = filteredData[0];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "gray", paddingX: "20px" },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <HeaderBackButton onPress={() => router.back()} />,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ padding: "20px", paddingBottom: 100, alignItems: "center" }}
        >
          <Image
            source={{
              uri: park.logo,
            }}
            style={{ width: "50px", height: "50px" }}
            resizeMode="contain"
          />
          <Text>{park.name}</Text>
          <View style={{ marginTop: "20px" }}>
            <Text>Descrição</Text>
            <Text>{park.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParkDetails;
