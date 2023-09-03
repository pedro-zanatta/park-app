import {
  View,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import BlueBackground from "../assets/blue-background.png";
import GiantWheel from "../assets/giant-wheel.png";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Welcome = () => {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Image source={BlueBackground} style={{ width: width, height: height }} />
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          justifyContent: "space-between",
          height: height,
          paddingTop: 200,
          paddingBottom: 120,
        }}
      >
        <Image
          source={GiantWheel}
          style={{ width: 120, height: 120, resizeMode: "contain" }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: "16px",
            width: width,
            justifyContent: "space-between",
            paddingRight: 42,
          }}
        >
          <View
            style={{
              padding: 16,
              borderTopRightRadius: 32,
              borderBottomRightRadius: 32,
              backgroundColor: "white",
              width: "60%",
              alignItems: "flex-end",
            }}
          >
            <Text>Seja bem-vindo</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push(`/home`)}
            style={{
              backgroundColor: "white",
              width: 60,
              height: 60,
              borderRadius: "64px",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name="arrow-right" size={20} color="black" solid />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
