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

const { width } = Dimensions.get("window");
const EvidenceBrief = ({ navigation }) => {
  const [evidences, setEvidences] = useState([]);
  useEffect(() => {
    const db = database;
    onValue(myref(db, "evidenceBrief"), (snapshot) => {
      const obj = [];
      const data = snapshot.val();
      if (data !== null) {
        const result = Object.keys(data).map((key) => [key, data[key]]);
        for (let i = 0; i < result.length; i++) {
          let key = result[i][0];
          let value = result[i][1];
          obj.push({ ...value, id: key });
          obj[key] = value;
        }
      }
      setEvidences(obj);
    });
  }, []);

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
        {evidences &&
          evidences.map((news) => (
            <TouchableOpacity
              key={news.id}
              onPress={() =>
                navigation.navigate("EvidenceDetails", {
                  title: news.title,
                  image: news.imageUrl,
                  description: news.description,
                  date: news.date,
                  attachedUrl: news.attachedUrl,
                  filename: news.filename,
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
                    uri: news.imageUrl,
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
