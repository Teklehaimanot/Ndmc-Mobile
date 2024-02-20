import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Pressable,
  Linking,
} from "react-native";
import { color } from "../utilities/Colors";

const { width } = Dimensions.get("window");
const JornalCard = ({ contents }) => {
  return (
    <View style={[styles.cardview, styles.boxShadow]}>
      <Text
        style={{
          marginHorizontal: 7,
          marginTop: 15,
          color: color.blueOcean,
          letterSpacing: 0.5,
          paddingVertical: 3,
        }}
      >
        <Text
          style={{
            color: color.greenGray,
            fontWeight: "bold",
          }}
        >
          Title:
        </Text>{" "}
        {contents.title}
      </Text>
      <Text
        style={{
          marginHorizontal: 7,
          marginTop: 3,
          color: color.blueGray,
          letterSpacing: 0.1,
        }}
      >
        <Text
          style={{
            color: color.greenGray,
            fontWeight: "bold",
          }}
        >
          PubDate:
        </Text>{" "}
        {contents.pubdate}
      </Text>
      <Text
        style={{
          marginHorizontal: 7,
          marginTop: 3,
          color: color.blueGray,
          letterSpacing: 0.1,
        }}
      >
        <Text
          style={{
            color: color.greenGray,
            fontWeight: "bold",
          }}
        >
          Source:
        </Text>{" "}
        {contents.source}
      </Text>
      <Text
        style={{
          marginHorizontal: 7,
          marginTop: 3,
          color: color.blueGray,
          letterSpacing: 0.1,
        }}
      >
        <Text
          style={{
            color: color.greenGray,
            fontWeight: "bold",
          }}
        >
          Authors:
        </Text>{" "}
        {contents.authors.map((auther) => auther.name + ", ")}
      </Text>
      <Text
        style={{
          color: color.blue,
          paddingHorizontal: 7,
          paddingTop: 3,
        }}
        onPress={() => {
          Linking.openURL(contents.url);
        }}
      >
        Go to page
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardview: {
    backgroundColor: color.gray,
    flexDirection: "column",
    justifyContent: "space-between",
    width: width * 1,
    borderColor: color.blueGray,
    borderWidth: 0.2,
    borderBottomColor: color.greenGray,
    paddingBottom: 15,
    marginBottom: 3,
  },
  boxShadow: {
    borderRadius: 0.4,
    elevation: 1,
    shadowColor: color.greenGray,
    shadowOffset: { width: 0, height: 0.5 * 2 },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 2,
  },
});
export default JornalCard;
