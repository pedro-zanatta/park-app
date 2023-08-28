import { Text, View, TouchableOpacity, Image } from "react-native";

const ParkCard = ({ park, handleCardPress, isHorizontal }) => {
  return (
    <TouchableOpacity onPress={() => handleCardPress(park)}>
      <View
        style={{
          width: "100px",
          height: isHorizontal ? "unset" : "120px",
          flexDirection: isHorizontal ? "row" : "column",
          gap: isHorizontal ? "8px" : "unset",
          alignItems: isHorizontal ? "center" : "unset",
        }}
      >
        <View
          style={{
            width: "50px",
            height: "50px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#dddedf",
            borderRadius: "6px",
          }}
        >
          <Image
            source={{
              uri: park.logo,
            }}
            style={{ width: "80%", height: "80%" }}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text numberOfLines={1} style={{ fontWeight: "600" }}>
            {park?.name}
          </Text>
          <Text numberOfLines={1} style={{ color: "#8c8d8e" }}>
            {park?.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ParkCard;
