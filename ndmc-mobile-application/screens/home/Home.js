import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { color } from "../../utilities/Colors";
import {
  useDislikeNewsByIdMutation,
  useGetNewsQuery,
  useLikeNewsByIdMutation,
} from "../../services";
import { RefreshControl } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { baseUrl } from "../../config";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const flatListRef = useRef();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [mynews, setNews] = useState([]);
  const basicUrl = baseUrl;
  const { user } = useSelector((state) => state.auth);
  const { data, error, isLoading, refetch } = useGetNewsQuery({
    page,
    limit: pageSize,
  });
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
    refetch({ page, limit: pageSize });
  }, [page, refetch]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      setNews((prevNews) => {
        if (page === 1) {
          setPageSize(data.data.length);
          return data.data;
        } else {
          const newNews = data.data.filter(
            (newItem) => !prevNews.some((item) => item._id === newItem._id)
          );
          return [...prevNews, ...newNews];
        }
      });
    }
  }, [data, error, isLoading, page]);

  const handleLiked = (newsid) => {
    try {
      if (user) {
        likeNews(newsid);
      } else navigation.navigate("login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisliked = (newsid) => {
    try {
      if (user) {
        dislikeNews(newsid);
      } else navigation.navigate("login");
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardview}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("details", {
            id: item._id,
            title: item.title,
            image: basicUrl + "/" + item.image,
            description: item.description,
            comments: item.comments,
            date: item.date,
            likes: item.likes,
            dislikes: item.dislikes,
          })
        }
      >
        <View>
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
            {item.title}
          </Text>
          <Image
            style={styles.image}
            source={{
              uri: `${basicUrl + "/" + item.image}`,
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          margin: 10,
          borderTopColor: color.blueOcean,
          borderTopWidth: 0.5,
          backgroundColor: color.gray,
          paddingTop: 7,
        }}
      >
        <View>
          <Text style={{ color: color.blue, textAlign: "center" }}>Date</Text>
          <Text>{formatDateToYYYYMMDD(item.date)}</Text>
        </View>
        <Pressable
          onPress={() => {
            handleLiked(item._id);
          }}
        >
          <AntDesign
            name="like2"
            size={18}
            color={color.blue}
            style={item.likedBy.includes(user?.id) ? styles.likedeButton : " "}
          />
          <Text style={{ textAlign: "center" }}>{item.likes}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            handleDisliked(item._id);
          }}
        >
          <AntDesign
            name="dislike2"
            size={18}
            color={color.blue}
            style={
              item.dislikedBy.includes(user?.id) ? styles.likedeButton : " "
            }
          />
          <Text style={{ textAlign: "center" }}>{item.dislikes}</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("comments", {
              newsid: item._id,
            })
          }
        >
          <Text style={{ color: color.blue }}>comments</Text>
          <Text style={{ textAlign: "center" }}>{item.comments.length}</Text>
        </Pressable>
      </View>
    </View>
  );

  const keyExtractor = (item) => `${item._id}`;

  const handleEndReached = () => {
    if (!isLoading && data.data.length === pageSize) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch({ page: 1, limit: pageSize });
    setRefreshing(false);
    setPage(1);
  };

  if (isLoading && page === 1) {
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
          Error loading data. Please try again.
        </Text>
        <TouchableOpacity onPress={refetch}>
          <Text style={{ color: color.blue, marginTop: 10 }}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        style={styles.cardList}
        data={mynews}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          isLoading &&
          page > 1 && <ActivityIndicator size="large" color={color.primary} />
        }
      />
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
  likedeButton: {
    backgroundColor: color.blueOcean,
    color: color.white,
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});

export default Home;
