import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useGetJornalsQuery } from "../../services/researchJornalApi";
import JornalCard from "../../components/JornalCard";
import { RefreshControl } from "react-native-gesture-handler";
import { color } from "../../utilities/Colors";

const ResearchJornal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [jornals, setJornals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data, error, refetch } = useGetJornalsQuery({
    page: page,
    title: searchQuery,
  });

  useEffect(() => {
    refetch({ page });
  }, [page, refetch]);

  useEffect(() => {
    if (!error && data) {
      setIsLoading(false);
    }
  }, [data, error]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      setJornals((prevJounals) => {
        if (page === 1) {
          return data.articles.filter(
            (item) => item !== null && item.uid !== null
          );
        } else {
          const newJornals = data.articles.filter((newItem) => {
            console.log(newItem);
            if (newItem && newItem.uid) {
              return !prevJounals.some((item) => item.uid === newItem.uid);
            }
          });
          return [...prevJounals, ...newJornals];
        }
      });
    }
  }, [data, error, isLoading, page]);

  const renderJournalCard = ({ item }) => {
    if (item && item.uid) {
      return <JornalCard key={item.uid} contents={item} />;
    }
  };

  const handleEndReached = () => {
    if (!isLoading && jornals.length > 0) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch({ page: 1 });
    setRefreshing(false);
    setPage(1);
  };

  const handleRetry = () => {
    setIsLoading(true);
    refetch();
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
        <TouchableOpacity onPress={handleRetry}>
          <Text style={{ color: color.blue, marginTop: 10 }}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Title"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {jornals && (
        <FlatList
          data={jornals}
          renderItem={renderJournalCard}
          keyExtractor={(item) => (item && item.uid ? item.uid.toString() : "")}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            page > 1 && <ActivityIndicator style={styles.loader} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  searchButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 20,
    color: "red",
    fontSize: 16,
  },
});

export default ResearchJornal;
