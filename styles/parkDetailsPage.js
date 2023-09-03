import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuButton: (isActive) => ({
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isActive ? "#3c5c9b" : "#c4c5c8",
    borderRadius: 8,
  }),
});

export default styles;
