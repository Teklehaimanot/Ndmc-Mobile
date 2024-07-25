import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "../utilities/Colors";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { useState } from "react";

const { width } = Dimensions.get("window");
const EvidenceDetail = ({ route }) => {
  const { title, image, description, date, pdf } = route.params;
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const apiUrl = pdf;
  const name = apiUrl.split("/")[5];

  const downloadFromUrl = async () => {
    setDownloadingPdf(true);
    console.log(name);
    try {
      const filename = name;
      console.log(apiUrl);
      const result = await FileSystem.downloadAsync(
        apiUrl,
        FileSystem.documentDirectory + filename
      );

      const mimetype =
        result.headers["Content-Type"] || "application/octet-stream";

      await save(result.uri, filename, mimetype);
    } catch (error) {
      console.error("Error downloading from URL:", error);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const save = async (uri, filename, mimetype) => {
    setDownloadingPdf(true);
    try {
      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            filename,
            mimetype
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, {
                encoding: FileSystem.EncodingType.Base64,
              });
            })
            .catch((e) => console.log(e));
        } else {
          shareAsync(uri);
        }
      } else {
        shareAsync(uri);
      }
    } catch (error) {
      console.error("Error saving file:", error);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const formatDateToYYYYMMDD = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  console.log(pdf, "pd");
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            marginVertical: 20,
            paddingHorizontal: 10,
            fontWeight: "bold",
            fontSize: 15,
            lineHeight: 20,
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
        <View style={{ width: width * 1, height: 270 }}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>

        <Text style={{ margin: 10, color: color.blue }}>
          Date: {formatDateToYYYYMMDD(date)}
        </Text>
        <Pressable style={styles.button} onPress={downloadFromUrl}>
          {downloadingPdf ? (
            <ActivityIndicator size="small" color={color.white} />
          ) : (
            <Text
              style={{
                color: color.white,
                fontWeight: "bold",
                letterSpacing: 3,
              }}
            >
              Download - PDF
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default EvidenceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: color.primary,
    marginVertical: 15,
    marginHorizontal: width * 0.03,
  },
});
