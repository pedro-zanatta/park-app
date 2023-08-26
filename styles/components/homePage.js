import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: "8px",
    backgroundColor: "gray",
    borderRadius: "8px",
    height: "32px",
  },
  searchButton: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  parksFlatList: {
    padding: "10px",
    width: "100%",
  },
});

export default styles;
