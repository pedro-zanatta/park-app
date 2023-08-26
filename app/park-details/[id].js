import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { useState } from "react";
import { Stack, useSearchParams, useRouter } from "expo-router";
import HeaderBackButton from "../../components/Buttons/HeaderBackButton";

const jsonData = require("../../data/parksData.json");

const ParkDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [imgActive, setimgActive] = useState(0);
  const filteredData = jsonData.filter(
    (park) => park.id.toString() === params.id
  );
  const park = filteredData[0];
  console.log(park, "park");
  const imagesArray = park.images;
  console.log(imagesArray, "hey");

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
          headerStyle: { backgroundColor: "gray" },
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
              padding: "20px",
              paddingBottom: 100,
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
          <View style={{ marginTop: "20px" }}>
            <Text style={{ fontWeight: "600" }}>Descrição</Text>
            <Text>{park.description}</Text>
          </View>
          <View style={{ marginTop: "20px" }}>
            <Text style={{ fontWeight: "600" }}>Website</Text>
            <Text>{park.websiteLink}</Text>
          </View>
          <View style={{ marginTop: "20px" }}>
            <Text style={{ fontWeight: "600" }}>Redes Sociais</Text>
            <Text>{park.socialMediaLinks?.insta}</Text>
            <Text>{park.socialMediaLinks?.tiktok}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <ScrollView
              onScroll={({ nativeEvent }) => onchange(nativeEvent)}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              bounces={false}
              style={{ width: "200px", height: "200px" }}
            >
              {imagesArray.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  resizeMode="stretch"
                  style={{ width: "200px", height: "200px" }}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParkDetails;
