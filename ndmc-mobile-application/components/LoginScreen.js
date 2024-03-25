import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { color } from "../utilities/Colors";
import { TextInput } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <Text
          style={{
            fontWeight: "bold",
            color: color.blueGray,
            paddingHorizontal: 5,
            fontSize: 20,
          }}
        >
          Login
        </Text>
        <View>
          <TextInput placeholder="Email" style={styles.textInput} />
        </View>
        <View>
          <TextInput placeholder="Password" style={styles.textInput} />
        </View>
        <Pressable style={styles.button}>
          <Text
            style={{
              padding: 14,
              color: color.white,
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            Login
          </Text>
        </Pressable>

        <View style={styles.createAccount}>
          <Text style={{ color: color.blueGray }}>New user?</Text>
          <Pressable>
            <Text style={{ color: color.blue }}>Create an account</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  createAccount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
  },
});
export default LoginScreen;
