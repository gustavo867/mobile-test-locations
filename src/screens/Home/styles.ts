import { Dimensions, StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#13131A",
  },
  rowTop: {
    flexDirection: "row",
    alignSelf: "center",
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: ms(10),
  },
  title: {
    fontSize: ms(20),
    color: "#fff",
  },
});

export default styles;
