import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { color } from "../../utilities/Colors";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const AboutPage = ({ navigation }) => {
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
            The National Data Management Center for Health (NDMC),
          </Text>
          <Text style={{ color: color.blueGray, lineHeight: 20 }}>
            under theEthiopian Public Health Institute (EPHI), is responsible to
            archive health related data. Distinctively, the center shoulders the
            responsibility of processing and managing researches on community
            health. Besides, the center is known to apply robust data analytic
            techniques to apply synthesis evidence. That, on its part, has been
            an input to ensure evidence utilization for decision making by the
            Federal Ministry of Health (FMoH) and other relevant stakeholders at
            all levels. NDMC has collaborative partnership with the Institute
            for Health Metrics and Evaluation (IHME) at the University of
            Washington, and has established a unit studying and documenting
            burden of disease at a national level. The National Data Management
            Center for Health (NDMC), under the Ethiopian Public Health
            Institute (EPHI), is responsible to archive health related data.
            Distinctively, the center shoulders the responsibility of processing
            and managing researches on community health. Besides, the center is
            known to apply robust data analytic techniques to apply synthesis
            evidence. That, on its part, has been an input to ensure evidence
            utilization for decision making by the Federal Ministry of Health
            (FMoH) and other relevant stakeholders at all levels.
            <Text
              onPress={() => navigation.navigate("aboutDetail")}
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
            Multi-disciplinary teams of high caliber staffs are working at the
            center to achieve the center’s five key strategies.
          </Text>
          <Text
            style={{
              color: color.blueGray,
              lineHeight: 20,
            }}
          >
            Strategy 1: Build research Capacity on data mining and big data
            management for EPHI and partners (Capacity) Strategy
          </Text>
          <Text
            style={{ color: color.blueGray, lineHeight: 20, marginVertical: 5 }}
          >
            Strategy 2: Establish specific databases within NDMC, generate data
            and share, and improve data availability and accessibility for local
            and international users (Data)
          </Text>
          <Text
            style={{ color: color.blueGray, lineHeight: 20, marginVertical: 5 }}
          >
            Strategy 3: Establish and strengthen local and international
            collaboration (Collaboration)
          </Text>
          <Text
            style={{ color: color.blueGray, lineHeight: 20, marginVertical: 5 }}
          >
            Strategy 4: Ensure local and international funding to undertake the
            different health and health related researches (Funding)
          </Text>
          <Text
            style={{ color: color.blueGray, lineHeight: 20, marginVertical: 5 }}
          >
            Strategy 5: Ensure utilization of population health evidence for
            decision in the FMOH and key partners (Utilization)
          </Text>
        </View>
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
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
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
