import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "../utilities/Colors";
import NewsDetailNavigator from "../navigator/NewsDetailNavigator";

const { width } = Dimensions.get("window");
const Post = ({ route, navigation }) => {
  const { title, image, description, date } = route.params;

  const formatDateToYYYYMMDD = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            marginVertical: 20,
            paddingHorizontal: 10,
            fontWeight: "bold",
            fontSize: 15,
            lineHeight: 25,
            letterSpacing: 1,
            color: color.greenGray,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
            color: color.blueGray,
            marginBottom: 20,
            lineHeight: 25,
            letterSpacing: 0.75,
          }}
        >
          {description}
        </Text>
        <Image style={styles.image} source={{ uri: image }} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            margin: 10,
          }}
        >
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ color: color.blue, textAlign: "center" }}>Date</Text>
            <Text>{formatDateToYYYYMMDD(date)}</Text>
          </View>
          <Pressable
            style={{ marginHorizontal: 10 }}
            onPress={() => navigation.navigate("comments")}
          >
            <Text style={{ color: color.blue }}>comments</Text>
            <Text style={{ textAlign: "center" }}>3</Text>
          </Pressable>
        </View>
        <NewsDetailNavigator />
      </ScrollView>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width * 1,
    height: 460,
  },
});
