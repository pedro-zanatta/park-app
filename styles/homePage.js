import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 8,
    backgroundColor: "#F3F4F8",
    borderRadius: 8,
    height: 40,
  },
  menuButton: (isSelected) => ({
    height: 24,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: isSelected ? "black" : "#c4c5c8",
    borderRadius: 32,
    justifyContent: "center",
  }),
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  parksFlatList: {
    padding: 10,
    width: "100%",
  },
});

export default styles;
