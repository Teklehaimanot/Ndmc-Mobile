import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { color } from "../../utilities/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { useGetAboutNdmcQuery } from "../../services";
import Collaborators from "../../components/Collaborators";

const { width } = Dimensions.get("window");

const AboutPage = ({ navigation }) => {
  const { data, error, isLoading, refetch } = useGetAboutNdmcQuery();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: color.red }}>
          Error loading data. Please try again.
        </Text>
        <TouchableOpacity onPress={refetch}>
          <Text style={{ color: color.blue, marginTop: 10 }}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <View style={[styles.header, styles.boxShadow]}>
          <Text style={styles.welcomeHeader}>WELCOME TO NDMC</Text>
          <Text style={{ color: color.greenGray, fontSize: 15 }}>
            .. CENTRALLY ARCHIVING HEALTH AND HEALTH RELATED DATA
          </Text>
        </View>
      </View>
      {data && (
        <ScrollView
          style={[
            styles.cardView,
            { borderWidth: 0.4, padding: 10, marginVertical: 15 },
          ]}
        >
          <View style={[styles.header, styles.boxShadow]}>
            <Text style={styles.headingStyle}>DIRECTOR'S STATEMENT</Text>
            <Text
              style={{ fontSize: 15, color: color.blueOcean, marginBottom: 10 }}
            >
              {data.directorStatement.title}
            </Text>
            <Text style={{ color: color.blueGray, lineHeight: 20 }}>
              {data.directorStatement.description}
              <Text
                onPress={() =>
                  navigation.navigate("aboutDetail", {
                    aboutUs: data.aboutUs,
                    vision: data.vision,
                    mission: data.mission,
                  })
                }
                style={{ color: color.blue }}
              >
                View Details
              </Text>
            </Text>
          </View>
          <View style={[styles.header, styles.boxShadow]}>
            <Text style={styles.headingStyle}>OUR STRATEGIES</Text>
            <Text
              style={{ fontSize: 15, color: color.blueOcean, marginBottom: 10 }}
            >
              {data.strategies.title}
            </Text>
            <Text
              style={{
                color: color.blueGray,
                lineHeight: 20,
              }}
            >
              {data.strategies.description}
            </Text>
          </View>
          <Collaborators />
        </ScrollView>
      )}
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
  partinership: {
    width: 0.37 * width,
    marginVertical: 8,
    height: 100,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    resizeMode: "contain",
  },
});
export default AboutPage;
