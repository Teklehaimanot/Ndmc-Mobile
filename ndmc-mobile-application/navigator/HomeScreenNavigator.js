import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/Home";
import Post from "../components/NewsDetail";
import CommentScreen from "../components/CommentScreen";
import LoginScreen from "../components/LoginScreen";
import RegisterAccount from "../components/RegisterAccount";

const Stack = createNativeStackNavigator();
const HomeScreenNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="details"
        component={Post}
        options={{
          headerShown: true,
          headerTitle: "Details",
        }}
      />
      <Stack.Screen
        name="comments"
        component={CommentScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="signUp"
        component={RegisterAccount}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
export default HomeScreenNavigator;
