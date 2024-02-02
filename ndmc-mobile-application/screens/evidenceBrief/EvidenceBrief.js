import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { database } from "../../services/firebase.config";
import { onValue, ref as myref } from "firebase/database";
import { color } from "../../utilities/Colors";
import { useState, useEffect } from "react";
import { useGetEvidenceBriefQuery } from "../../services";

const { width } = Dimensions.get("window");
const EvidenceBrief = ({ navigation }) => {
  const [evidences, setEvidences] = useState([]);
  const basicUrl = process.env.REACT_APP_BACKEND_URL;
  const { data, error, isLoading } = useGetEvidenceBriefQuery();

  useEffect(() => {
    if (!isLoading && !error && data) {
      setEvidences(data.data);
    }
  }, [data, error, isLoading]);

  if (!evidences.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cardList}>
        {error && <Text style={{ color: "red" }}>{error.data.error}</Text>}
        {evidences &&
          evidences.map((news) => (
            <TouchableOpacity
              key={news._id}
              onPress={() =>
                navigation.navigate("EvidenceDetails", {
                  title: news.title,
                  image: basicUrl + "/" + news.image,
                  description: news.description,
                  date: news.date,
                  pdf: basicUrl + "/" + news.pdf,
                })
              }
            >
              <View style={styles.cardview}>
                <Text
                  style={{
                    marginHorizontal: 15,
                    marginTop: 15,
                    color: color.blueOcean,
                    backgroundColor: color.keyllyGreen,
                    padding: 15,
                    borderRadius: 5,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}
                >
                  {news.title}
                </Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${basicUrl + "/" + news.image}`,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardList: {
    backgroundColor: color.grayDark,
  },
  cardview: {
    backgroundColor: color.gray,
    flexDirection: "column",
    justifyContent: "space-between",
    width: width * 1,
    borderColor: color.blueGray,
    borderWidth: 0.2,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.greenGray,
    borderRadius: 5,
  },
  image: {
    width: width * 0.9,
    height: width * 0.5,
    marginVertical: width * 0.08,
    marginHorizontal: width * 0.05,
    borderRadius: 5,
    resizeMode: "contain",
  },
});

export default EvidenceBrief;
