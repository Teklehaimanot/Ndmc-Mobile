import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "../utilities/Colors";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  useDislikeNewsByIdMutation,
  useGetNewsByIdQuery,
  useLikeNewsByIdMutation,
} from "../services";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");
const Post = ({ route, navigation }) => {
  const { id, title, image, description, date, likes, dislikes, comments } =
    route.params;
  const { user } = useSelector((state) => state.auth);
  const { data, error, isLoading, refetch } = useGetNewsByIdQuery(id);
  const [news, setNews] = useState({});

  const [likeNews] = useLikeNewsByIdMutation();
  const [dislikeNews] = useDislikeNewsByIdMutation();
  const formatDateToYYYYMMDD = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    refetch(likes, dislikes);
  }, [likes, dislikes]);

  useEffect(() => {
    setNews(data);
  }, [data]);
  const handleLiked = (newsid) => {
    try {
      if (user) {
        console.log(news);
        likeNews(newsid);
        setNews({
          ...news,
          likes: news.likedBy.includes(user.id) ? news.likes : news.likes + 1,
          dislikes: news.dislikedBy.includes(user.id)
            ? news.dislikes - 1
            : news.dislikes,
          likedBy: [...news.likedBy, user.id],
          dislikedBy: news.dislikedBy.filter((eachDislike) => {
            return eachDislike !== user.id;
          }),
        });
      } else navigation.navigate("login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisliked = (newsid) => {
    try {
      if (user) {
        dislikeNews(newsid);
        setNews({
          ...news,
          dislikes: news.dislikedBy.includes(user.id)
            ? news.dislikes
            : news.dislikes + 1,
          likes: news.dislikedBy.includes(user.id)
            ? news.likes
            : news.likes - 1,
          dislikedBy: [...news.dislikedBy, user.id],
          likedBy: news.likedBy.filter((eachlike) => {
            return eachlike !== user.id;
          }),
        });
      } else navigation.navigate("login");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: color.red }}>
          Error loading data.
        </Text>
        <Text style={{ color: color.blue, marginTop: 10 }}>
          Press the arrow button and Go back to home page
        </Text>
      </View>
    );
  }

  return (
    news && (
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
              justifyContent: "space-around",
              margin: 10,
              borderTopColor: color.blueOcean,
              borderTopWidth: 0.5,
              backgroundColor: color.gray,
              paddingTop: 10,
            }}
          >
            <View>
              <Text style={{ color: color.blue, textAlign: "center" }}>
                Date
              </Text>
              <Text>{formatDateToYYYYMMDD(date)}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleLiked(id);
              }}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}
            >
              <AntDesign
                name="like2"
                size={18}
                color={color.blue}
                style={
                  news.likedBy?.includes(user?.id) ? styles.likedeButton : " "
                }
              />
              <Text style={{ textAlign: "center" }}>{news?.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleDisliked(id);
              }}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}
            >
              <AntDesign
                name="dislike2"
                size={18}
                color={color.blue}
                style={
                  news.dislikedBy?.includes(user?.id)
                    ? styles.likedeButton
                    : " "
                }
              />
              <Text style={{ textAlign: "center" }}>{news?.dislikes}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("comments", {
                  newsid: id,
                  comments: comments,
                })
              }
            >
              <Text style={{ color: color.blue }}>comments</Text>
              <Text style={{ textAlign: "center" }}>
                {news?.comments?.length}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width * 1,
    height: 400,
  },
  likedeButton: {
    backgroundColor: color.blueOcean,
    color: color.white,
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});
