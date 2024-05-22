import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { color } from "../utilities/Colors";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { login } from "../state/auth/authSlice";
import { baseUrl } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import axios from "axios";

const { width } = Dimensions.get("window");
const RegisterAccount = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const basicUrl = baseUrl;

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${basicUrl}/api/v1/user`, {
        name,
        email,
        password,
        confirmPassword,
      });
      if (data) {
        const { user, token } = data;
        const jsonUser = JSON.stringify(data);
        AsyncStorage.setItem("token", jsonUser);
        setErrors(false);
        setIsLoading(false);
        dispatch(login({ user, token }));
        navigation.navigate("Home");
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.error);
        setIsLoading(false);
      } else {
        alert("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.loginCard}>
          <Text
            style={{
              color: color.error,
            }}
          >
            {errors}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: color.blueGray,
              paddingHorizontal: 5,
              fontSize: 20,
            }}
          >
            Create Account
          </Text>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.textInput}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
            {isLoading ? (
              <ActivityIndicator size="small" color={color.white} />
            ) : (
              <Text
                style={{
                  color: color.white,
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                  letterSpacing: 1,
                }}
              >
                Create Account
              </Text>
            )}
          </Pressable>

          <View style={styles.createAccount}>
            <Text style={{ color: color.blueGray }}>Have an Account?</Text>
            <Pressable onPress={() => navigation.navigate("login")}>
              <Text style={{ color: color.blue }}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    grayBackground: color.grayBackground,
  },
  loginCard: {
    width: width * 0.88,
    marginHorizontal: width * 0.06,
    backgroundColor: color.grayBackground,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  textInput: {
    padding: 8,
    marginHorizontal: 5,
    marginVertical: 7,
    borderRadius: 5,
    backgroundColor: color.white,
  },
  button: {
    backgroundColor: color.primary,
    margin: 5,
    borderRadius: 5,
    paddingVertical: 14,
  },
  createAccount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
  },
});
export default RegisterAccount;
