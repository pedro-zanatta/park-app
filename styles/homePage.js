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
    backgroundColor: "#F3F4F8",
    color: "#c4c5c8",
    borderRadius: "8px",
    height: "40px",
  },
  menuButton: (isSelected) => ({
    height: "24px",
    paddingHorizontal: "8px",
    border: isSelected ? "1px solid black" : "1px solid #c4c5c8",
    borderRadius: "32px",
  }),
  searchButton: {
    width: "40px",
    height: "40px",
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
