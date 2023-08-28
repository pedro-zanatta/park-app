import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuButton: (isActive) => ({
    height: "40px",
    width: "120px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isActive ? "red" : "#c4c5c8",
    borderRadius: "8px",
  }),
});

export default styles;
