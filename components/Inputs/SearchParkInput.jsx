import { TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import styles from "../../styles/homePage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SearchParkInput = ({ searchTerm, setSearchedPark }) => {
  const [searchedText, setSearchedText] = useState("");

  return (
    <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={(text) => setSearchedText(text)}
        placeholder="Digite o nome do parque"
        placeholderTextColor="#c4c5c8"
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => setSearchedPark(searchedText)}
      >
        <FontAwesome5 name="search" color="white" solid size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchParkInput;
