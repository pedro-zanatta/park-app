import { Text, View, TouchableOpacity, Image } from "react-native";

const ParkCard = ({ park, handleCardPress }) => {
  return (
    <TouchableOpacity onPress={() => handleCardPress(park)}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: park.logo,
          }}
          style={{ width: "50px", height: "50px" }}
          resizeMode="contain"
        />

        <Text numberOfLines={1}>{park?.name}</Text>
        <Text>{park?.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ParkCard;
