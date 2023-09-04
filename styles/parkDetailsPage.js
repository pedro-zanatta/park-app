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
  mediaButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#3c5c9b",
    alignItems: "center",
    justifyContent: "center",
  },
  contactItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    gap: 72,
  },
  logoBox: {
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dddedf",
    borderRadius: 6,
  },
});

export default styles;
