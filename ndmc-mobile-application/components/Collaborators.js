import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";

import { color } from "../utilities/Colors";
import { useGetCollaboratorsQuery } from "../services";

const { width } = Dimensions.get("window");
const Collaborators = () => {
  const { data, error, isLoading, refetch } = useGetCollaboratorsQuery();
  const basicUrl = process.env.REACT_APP_BACKEND_URL;

  // console.log("d", data[0]);
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
              Linking.openURL("https://www.healthdata.org/");
            }}
          >
            <View style={[styles.partinership, styles.boxShadow]}>
              <Image
                style={basicUrl + "/" + item.image}
                source={{
                  uri: item.link,
                }}
              />
            </View>
          </TouchableOpacity>
        ))}
        {/* <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.healthdata.org/");
          }}
        >
          <View style={[styles.partinership, styles.boxShadow]}>
            <Image
              style={styles.image}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/partners%2FIHME_Logo.jpg?alt=media&token=3d51e561-b445-474b-b0c9-36f9965f1211",
              }}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.gatesfoundation.org/");
          }}
        >
          <View style={[styles.partinership, styles.boxShadow]}>
            <Image
              style={styles.image}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/partners%2FBill%2520%2526%2520Melinda%2520Gates%2520Foundation%25202.png?alt=media&token=738a9352-6ba9-47ba-aab6-b29ee4c1a2c9",
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://africacdc.org/");
          }}
        >
          <View style={[styles.partinership, styles.boxShadow]}>
            <Image
              style={styles.image}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/partners%2FAfrica-CDC-Logo-EN.bmp?alt=media&token=a1841202-0fd0-49f0-ace3-2529cc16f462",
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.worldbank.org");
          }}
        >
          <View style={[styles.partinership, styles.boxShadow]}>
            <Image
              style={styles.image}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/partners%2FWorld-Bank.jpg?alt=media&token=ce489148-a4ad-401a-acdf-50ea8a3778d4",
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.moh.gov.et");
          }}
        >
          <View style={[styles.partinership, styles.boxShadow]}>
            <Image
              style={styles.image}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/partners%2Fmoh.jpeg?alt=media&token=91701add-e315-4192-a3de-5064d8279982",
              }}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL("http://www.aau.edu.et/");
          }}
        >
          <View style={[styles.partinership, styles.boxShadow]}>
            <Image
              style={styles.image}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/partners%2Faau.png?alt=media&token=d358df8f-c346-421b-b6fa-a4025b31897a",
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://uog.edu.et/");
          }}
        >
          <View style={[styles.partinership, styles.boxShadow]}>
            <Image
              style={styles.image}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/partners%2FUOG.png?alt=media&token=333300c7-070b-488e-a5d7-c47544894a6e",
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://ju.edu.et/");
          }}
        >
          <View style={[styles.partinership, styles.boxShadow]}>
            <Image
              style={styles.image}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/partners%2FJimma-Univerysity.webp?alt=media&token=0685f6b5-6d23-42c7-ad60-d6f37adc3956",
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.haramaya.edu.et/");
          }}
        >
          <View style={[styles.partinership, styles.boxShadow]}>
            <Image
              style={styles.image}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/partners%2Fharamaya.jpeg?alt=media&token=08d39df9-6243-4294-b7c9-45ffb3f250c9",
              }}
            />
          </View>
        </TouchableOpacity> */}
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
  },
});
