import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "../utilities/Colors";

const { width } = Dimensions.get("window");
const Post = ({ route }) => {
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
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: color.blue }}>
            Date: {formatDateToYYYYMMDD(date)}
          </Text>
          <Text style={{ color: color.blue }}>like</Text>
          <Text style={{ color: color.blue }}>Comments</Text>
        </View>
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
