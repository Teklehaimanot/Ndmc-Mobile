import { View, Text, StyleSheet, Dimensions } from "react-native";
import { color } from "../../utilities/Colors";

const { width } = Dimensions.get("window");
const Reports = () => {
  return (
    <View>
      <View style={styles.cardView}>
        <View style={[styles.header, styles.boxShadow]}>
          <Text style={styles.welcomeHeader}>NDMC AT A GLANCE</Text>
          <Text style={{ color: color.greenGray, fontSize: 15 }}>
            .. CENTRALLY ARCHIVING HEALTH AND HEALTH RELATED DATA
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 12,
    borderRadius: 5,
    padding: width * 0.05,
  },
  boxShadow: {
    borderRadius: 0.4,
    elevation: 1,
    shadowColor: color.greenGray,
    shadowOffset: { width: 0, height: 0.5 * 2 },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 2,
  },
  welcomeHeader: {
    fontSize: 20,
    color: color.greenGray,
    borderColor: color.blueGray,
    borderWidth: 0.5,
    paddingVertical: 15,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 2.5,
  },
  cardView: {
    width: width * 0.98,
    marginLeft: 0.01 * width,
  },
  headingStyle: {
    fontSize: 15,
    color: color.greenGray,
    marginBottom: 10,
    fontWeight: "bold",
    borderBottomWidth: 0.5,
    textAlign: "center",
    padding: 5,
    letterSpacing: 2,
  },
  partinership: {
    width: 0.4 * width,
    marginVertical: 10,
    height: 100,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
});
export default Reports;
