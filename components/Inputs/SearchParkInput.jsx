import { TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import styles from "../../styles/homePage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SearchParkInput = ({ searchTerm, setSearchedPark }) => {
  const [searchedText, setSearchedText] = useState("");

  return (
    <View style={{ flexDirection: "row", gap: "16px" }}>
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={(text) => setSearchedText(text)}
        placeholder="Digite o nome do parque"
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => setSearchedPark(searchedText)}
      >
        <FontAwesome5 name="search" color="white" solid size="16px" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchParkInput;
