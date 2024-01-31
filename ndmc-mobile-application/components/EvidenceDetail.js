import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "../utilities/Colors";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

const { width } = Dimensions.get("window");
const EvidenceDetail = ({ route }) => {
  const { title, image, description, date, attachedUrl, filename } =
    route.params;

  handleDownload = async () => {
    try {
      const result = await FileSystem.downloadAsync(
        attachedUrl,
        FileSystem.documentDirectory + filename
      );
      console.log(result.uri);
      save(result.uri, filename, result.headers["Content-Type"]);
    } catch (error) {
      alert("dwonload error - plase try again");
    }
  };

  const save = async (uri, filename, mimetype) => {
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
        <Image style={styles.image} source={{ uri: image }} />
        <Text style={{ margin: 10, color: color.blue }}>Date: {date}</Text>
        <Pressable style={styles.button} onPress={handleDownload}>
          <Text
            style={{ color: color.white, fontWeight: "bold", letterSpacing: 3 }}
          >
            Download - PDF
          </Text>
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
    width: width * 1,
    height: 300,
    resizeMode: "contain",
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
