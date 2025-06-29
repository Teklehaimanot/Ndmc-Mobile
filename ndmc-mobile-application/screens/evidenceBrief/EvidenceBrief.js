import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import { color } from "../../utilities/Colors";
import { useState, useEffect, useRef } from "react";
import { useGetEvidenceBriefQuery } from "../../services";
import { baseUrl } from "../../config";

const { width } = Dimensions.get("window");
const EvidenceBrief = ({ navigation }) => {
  const flatListRef = useRef();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [evidences, setEvidences] = useState([]);
  const basicUrl = baseUrl;
  const { data, error, isLoading, refetch } = useGetEvidenceBriefQuery({
    page,
    limit: pageSize,
  });

  useEffect(() => {
    refetch({ page, limit: pageSize });
  }, [page, refetch]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      setEvidences((prevEvidences) => {
        if (page === 1) {
          setPageSize(data.data.length);
          return data.data;
        } else {
          const newEvidences = data.data.filter(
            (newItem) => !prevEvidences.some((item) => item._id === newItem._id)
          );
          return [...prevEvidences, ...newEvidences];
        }
      });
    }
  }, [data, error, isLoading, page]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item._id}
      onPress={() =>
        navigation.navigate("EvidenceDetails", {
          title: item.title,
          image: basicUrl + "/" + item.image,
          description: item.description,
          date: item.date,
          pdf: basicUrl + "/" + item.pdf,
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
          {item.title}
        </Text>
        <View
          style={{
            width: width * 0.9,
            height: 240,
            marginVertical: width * 0.08,
            marginHorizontal: width * 0.05,
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: `${basicUrl + "/" + item.image}`,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
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
  // console.log(page, data?.data.length > 0, pageSize, mynews.length);
  console.log(basicUrl);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        style={styles.cardList}
        data={evidences}
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
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: color.greenGray,
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    resizeMode: "stretch",
  },
});

export default EvidenceBrief;
