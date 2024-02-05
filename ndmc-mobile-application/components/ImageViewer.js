import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { color } from "../utilities/Colors";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ImageViewer = ({ visible, imageUrl, onClose }) => {
  const [permissions, setPermissions] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setPermissions(status === "granted");
  };

  const downloadImage = async () => {
    try {
      if (!permissions) {
        console.error("Permission not granted for downloading image.");
        return;
      }

      const filename = imageUrl.split("/").pop();
      const result = await FileSystem.downloadAsync(
        imageUrl,
        FileSystem.documentDirectory + filename
      );
      // console.log("Result:", result);

      if (result && result.uri) {
        const asset = await MediaLibrary.createAssetAsync(result.uri);
        await MediaLibrary.saveToLibraryAsync(asset);
        console.log("asset", asset);
        onClose();
      } else {
        console.error("Downloaded file URI is invalid or empty.");
      }
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={downloadImage}
          >
            <AntDesign name="download" size={24} color={color.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => onClose()}
          >
            <Text style={{ color: color.white, fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: color.grayDark,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  downloadButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default ImageViewer;
