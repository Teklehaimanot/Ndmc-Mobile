import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { color } from "../utilities/Colors";

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/profileImage";
  const proileImage =
    "%2Flogo.png?alt=media&token=b9db2afd-6b47-4809-922e-b5bd8e2a68a1";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.gray }}>
      <View
        style={{
          backgroundColor: color.primary,
          paddingBottom: 30,
          borderBottomEndRadius: 10,
        }}
      >
        <Image
          source={{ uri: BASE_PATH + proileImage }}
          style={styles.sideMenuProfileIcon}
        />
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View
          style={{
            borderBottomColor: color.blueGray,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop: 30,
          }}
        ></View>
        <DrawerItem
          label="Visit Us"
          onPress={() => Linking.openURL("https://ndmc.ephi.gov.et")}
        />
        <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL("https://vizhub.ephi.gov.et/");
            }}
          >
            Rate Us
          </Text>
          <Image
            source={{ uri: BASE_PATH + "star_filled.png" }}
            style={styles.iconStyle}
          />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
    backgroundColor: color.cameraBackground,
    margin: 20,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomSidebarMenu;
