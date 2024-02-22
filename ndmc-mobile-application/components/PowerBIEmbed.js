import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const PowerBIEmbed = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      <WebView
        source={{
          uri: "https://app.powerbi.com/view?r=eyJrIjoiZDM2NGI1MjctOTJmOC00MjA1LWI4OGEtZmNhNjJkOThjNzQ2IiwidCI6IjIzOWJjYTJjLWEyNTctNDBkYi05YTEwLWI1MDZiNjI0MTc1MiJ9",
        }}
        scalesPageToFit={true}
        style={styles.webView}
        onLoad={() => setIsLoading(false)} // Hide loader when content is loaded
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }], // Center the loader
  },
  webView: {
    flex: 1,
  },
});

export default PowerBIEmbed;
