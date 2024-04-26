import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Pressable,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { color } from "../utilities/Colors";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../state/auth/authSlice";
import { baseUrl } from "../config";
import axios from "axios";

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    "https://firebasestorage.googleapis.com/v0/b/ndmc-mobile-5a8b5.appspot.com/o/profileImage";
  const proileImage =
    "%2Flogo.png?alt=media&token=b9db2afd-6b47-4809-922e-b5bd8e2a68a1";

  const { user } = useSelector((state) => state.auth);
  const basicUrl = baseUrl;
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const response = await axios.get(
      `${basicUrl}/api/v1/user/logout/${user.id}`
    );
    const { data } = response;
    if (data) {
      dispatch(logout());
      AsyncStorage.removeItem("token");
    }
  };

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
        {user ? (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: color.white,
                fontSize: 20,
                fontWeight: "bold",
                paddingBottom: 5,
              }}
            >
              {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            </Text>
            <Text
              style={{
                color: color.blueOcean,
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {user.email}
            </Text>
          </View>
        ) : (
          ""
        )}
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
        {!user ? (
          <Pressable
            style={styles.customLogout}
            onPress={() => props.navigation.navigate("login")}
          >
            <SimpleLineIcons name="login" size={16} color={color.greenGray} />
            <Text
              style={{
                color: color.greenGray,
                fontWeight: "900",
                letterSpacing: 1,
                marginHorizontal: 5,
              }}
            >
              Login
            </Text>
          </Pressable>
        ) : (
          <Pressable style={styles.customLogout} onPress={handleLogout}>
            <SimpleLineIcons name="logout" size={16} color={color.blue} />
            <Text
              style={{
                color: color.blue,
                fontWeight: "900",
                letterSpacing: 1,
                marginHorizontal: 5,
              }}
            >
              Logout
            </Text>
          </Pressable>
        )}
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
  customLogout: {
    padding: 16,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomSidebarMenu;
