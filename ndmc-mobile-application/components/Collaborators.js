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

import { color } from "../utilities/Colors";
import { useGetCollaboratorsQuery } from "../services";

const { width } = Dimensions.get("window");
const Collaborators = () => {
  const { data, error, isLoading, refetch } = useGetCollaboratorsQuery();
  const basicUrl = process.env.REACT_APP_BACKEND_URL;

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
  console.log(basicUrl + "/" + data[0].image);
  return (
    <View style={[styles.header, styles.boxShadow]}>
      <Text style={styles.headingStyle}>PARTNERS AND COLLABORATORS</Text>

      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data?.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              Linking.openURL(`${item.link}`);
            }}
          >
            <View style={[styles.partinership, styles.boxShadow]}>
              <Image
                style={styles.image}
                source={{
                  uri: `${basicUrl + "/" + item.image}`,
                }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Collaborators;

const styles = StyleSheet.create({
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
    backgroundColor: color.white,
  },
});
