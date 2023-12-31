import { Text, View, TouchableOpacity, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ParkCard = ({
  park,
  handleCardPress,
  isHorizontal,
  removeFavorite,
  saveFavorite,
  fetchedIds,
}) => {
  const isFavorite = fetchedIds?.includes(JSON.stringify(park.id));

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(park.id);
    } else {
      saveFavorite(park.id);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => handleCardPress(park)}
        style={{ position: "relative" }}
      >
        <View
          style={{
            width: isHorizontal ? "100%" : 100,
            height: isHorizontal ? undefined : 120,
            flexDirection: isHorizontal ? "row" : "column",
            gap: 8,
            alignItems: isHorizontal ? "center" : undefined,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#dddedf",
              borderRadius: 6,
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
              {park?.cityState}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          display: isHorizontal ? "none" : "flex",
        }}
        onPress={() => handleFavoriteClick()}
      >
        <FontAwesome5
          name="star"
          size={16}
          color={isFavorite ? "orange" : "gray"}
          solid
        />
      </TouchableOpacity>
    </>
  );
};

export default ParkCard;
