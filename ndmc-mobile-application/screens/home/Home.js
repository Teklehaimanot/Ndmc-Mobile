import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "../../utilities/Colors";
import { useEffect, useState } from "react";
import { database } from "../../services/firebase.config";
import { onValue, ref as myref } from "firebase/database";
import { ActivityIndicator } from "react-native";

const { width } = Dimensions.get("window");
const Home = ({ navigation }) => {
  const [mynews, setNews] = useState([]);

  useEffect(() => {
    const db = database;
    onValue(myref(db, "news"), (snapshot) => {
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
      setNews(obj);
    });
  }, []);

  if (!mynews.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cardList}>
        {mynews &&
          mynews.map((news) => (
            <TouchableOpacity
              key={news.id}
              onPress={() =>
                navigation.navigate("details", {
                  title: news.title,
                  image: news.imageUrl,
                  description: news.description,
                  date: news.date,
                })
              }
            >
              <View style={styles.cardview}>
                <Text
                  style={{
                    marginHorizontal: 15,
                    marginTop: 15,
                    color: color.greenGray,
                    borderLeftWidth: 0.8,
                    borderLeftColor: color.primary,
                    paddingLeft: width * 0.05,
                    borderRightWidth: 0.8,
                    borderRightColor: color.primary,
                    paddingRight: width * 0.05,
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
  },
  image: {
    width: width * 1,
    height: 200,
    marginVertical: width * 0.08,
  },
});

export default Home;
