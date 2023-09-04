import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  welcomeButton: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: "64px",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    padding: 16,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: "white",
    width: "60%",
    alignItems: "flex-end",
  },
  mainContainer: (height) => ({
    alignItems: "center",
    position: "absolute",
    justifyContent: "space-between",
    height: height,
    paddingTop: 200,
    paddingBottom: 120,
  }),
  welcomeContainer: (width) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: "16px",
    width: width,
    justifyContent: "space-between",
    paddingRight: 42,
  }),
});

export default styles;
