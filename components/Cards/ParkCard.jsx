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
  console.log(isFavorite);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(park.id);
      console.log("removed");
    } else {
      saveFavorite(park.id);
      console.log("saved");
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
            width: 100,
            height: isHorizontal ? undefined : 120,
            flexDirection: isHorizontal ? "row" : "column",
            gap: isHorizontal ? 8 : undefined,
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
              {park?.description}
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
