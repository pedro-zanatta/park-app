import { TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import styles from "../../styles/homePage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SearchParkInput = ({ searchTerm, setSearchedPark }) => {
  const [searchedText, setSearchedText] = useState("");

  const handleSearch = () => {
    setSearchedPark(searchedText);
  };

  const handleInputSubmit = () => {
    handleSearch();
  };
  return (
    <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        returnKeyType="search"
        onChangeText={(text) => setSearchedText(text)}
        placeholder="Digite o nome do parque"
        placeholderTextColor="#c4c5c8"
        onSubmitEditing={handleInputSubmit}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <FontAwesome5 name="search" color="white" solid size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchParkInput;
