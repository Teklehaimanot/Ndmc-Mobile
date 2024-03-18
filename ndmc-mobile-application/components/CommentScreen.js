import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { image } from "../assets/logo.png";
import { color } from "../utilities/Colors";

const { width } = Dimensions.get("window");

const CommentScreen = () => {
  return (
    <View style={styles.constainer}>
      <ScrollView>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>

        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>Great Job</Text>
          </View>
        </View>
        <View style={styles.commentCard}>
          <View>
            <Image style={styles.image} uri={image} />
          </View>
          <View style={styles.commentView}>
            <Text style={{ padding: 5, fontWeight: "bold", fontSize: 15 }}>
              Teklehaimanot
            </Text>
            <Text style={{ paddingHorizontal: 5 }}>
              Great Job, That is really awsome work. keep up the good work
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  commentCard: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 8,
    width: width * 0.8,
  },
  image: {
    resizeMode: "center",
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
    alignSelf: "center",
    backgroundColor: color.cameraBackground,
    marginHorizontal: width * 0.02,
  },
  commentView: {
    backgroundColor: color.grayBackground,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
export default CommentScreen;
