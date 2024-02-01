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
import { ActivityIndicator } from "react-native";
import { useGetNewsQuery } from "../../services";

const { width } = Dimensions.get("window");
const Home = ({ navigation }) => {
  const [mynews, setNews] = useState([]);
  const basicUrl = process.env.REACT_APP_BACKEND_URL;

  const { data, error, isLoading } = useGetNewsQuery();

  useEffect(() => {
    if (!isLoading && !error && data) {
      setNews(data.data);
    }
  }, [data, error, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cardList}>
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        {mynews &&
          mynews.map((news) => (
            <TouchableOpacity
              key={news._id}
              onPress={() =>
                navigation.navigate("details", {
                  title: news.title,
                  image: basicUrl + "/" + news.image,
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
  },
  image: {
    width: width * 1,
    height: 200,
    marginVertical: width * 0.08,
  },
});

export default Home;
