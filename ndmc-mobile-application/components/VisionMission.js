import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "../utilities/Colors";

const { width } = Dimensions.get("window");
const VisionMession = ({ route }) => {
  const { aboutUs, vision, mission } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <View style={[styles.header, styles.boxShadow]}>
          <Text style={styles.welcomeHeader}>ABOUT</Text>
        </View>
      </View>
      <ScrollView
        style={[
          styles.cardView,
          { borderWidth: 0.4, padding: 10, marginVertical: 15 },
        ]}
      >
        <View style={[styles.header, styles.boxShadow]}>
          <Text
            style={{ fontSize: 15, color: color.blueOcean, marginBottom: 10 }}
          >
            ABOUT US
          </Text>
          <Text style={{ color: color.blueGray, lineHeight: 20 }}>
            {aboutUs}
          </Text>
        </View>
        <View style={[styles.header, styles.boxShadow]}>
          <Text
            style={{ fontSize: 15, color: color.blueOcean, marginBottom: 10 }}
          >
            VISION
          </Text>
          <Text
            style={{
              color: color.blueGray,
              lineHeight: 20,
            }}
          >
            {vision}
          </Text>
        </View>
        <View style={[styles.header, styles.boxShadow]}>
          <Text
            style={{ fontSize: 15, color: color.blueOcean, marginBottom: 10 }}
          >
            MISSION
          </Text>
          <Text
            style={{
              color: color.blueGray,
              lineHeight: 20,
            }}
          >
            {mission}
          </Text>
        </View>
      </ScrollView>
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
    elevation: 2,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 0.5 * 2 },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 2,
  },
  welcomeHeader: {
    fontSize: 20,
    color: color.blueOcean,
    backgroundColor: color.keyllyGreen,
    paddingVertical: 15,
    borderRadius: 3,
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
});

export default VisionMession;
