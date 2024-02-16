import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Pressable,
} from "react-native";
import { color } from "../../utilities/Colors";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import JornalCard from "../../components/JornalCard";

const { width } = Dimensions.get("window");
const ResearchJornal = () => {
  return (
    <View style={{ backgroundColor: color.grayDark }}>
      <View style={styles.searchBarcardView}>
        <View>
          <Text style={styles.welcomeHeader}>
            PubMed Journals From EPHI Affiliation
          </Text>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.serachInput}
              placeholder=" Search by Title"
            />
            <Pressable style={styles.searchButton}>
              <Text style={{ color: color.white, textAlign: "center" }}>
                Search
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <ScrollView>
        <JornalCard />
        <JornalCard />
        <JornalCard />
        <JornalCard />
        <JornalCard />
        <JornalCard />
        <JornalCard />
        <JornalCard />
        <JornalCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 10,
    borderRadius: 5,
    padding: width * 0.01,
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
    fontSize: 15,
    color: color.greenGray,

    paddingVertical: 5,
    marginTop: 5,
    marginHorizontal: 5,
  },
  searchBar: {
    flexDirection: "row",
    marginBottom: 15,
  },
  serachInput: {
    borderWidth: 0.5,
    margin: 2,
    padding: 1,
    width: width * 0.7,
    marginHorizontal: 5,
    borderRadius: 2,
  },
  searchButton: {
    borderWidth: 0.5,
    paddingHorizontal: 10,
    margin: 2,
    backgroundColor: color.primary,
    borderRadius: 2,
  },
  searchBarcardView: {
    width: width * 1,
    backgroundColor: color.gray,
    marginBottom: 3,
  },
});
export default ResearchJornal;
