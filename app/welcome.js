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
import styles from "../styles/welcomePage";

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
      <View style={styles.mainContainer(height)}>
        <Image
          source={GiantWheel}
          style={{ width: 120, height: 120, resizeMode: "contain" }}
        />

        <View style={styles.welcomeContainer(width)}>
          <View style={styles.welcomeText}>
            <Text>Seja bem-vindo</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push(`/home`)}
            style={styles.welcomeButton}
          >
            <FontAwesome5 name="arrow-right" size={20} color="black" solid />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
