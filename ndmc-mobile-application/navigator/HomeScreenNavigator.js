import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/Home";
import Post from "../components/NewsDetail";
import CommentScreen from "../components/CommentScreen";
import LoginScreen from "../components/LoginScreen";
import RegisterAccount from "../components/RegisterAccount";
import { useLayoutEffect } from "react";
import { color } from "../utilities/Colors";

const Stack = createNativeStackNavigator();
const HomeScreenNavigator = ({ navigation }) => {
  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      const route = e.data.state.routes[e.data.state.index];
      const index = route === null ? 0 : route?.state?.index;

      if (index === 1 || index === 2) {
        navigation.setOptions({
          drawerLockMode: "locked-closed",
          headerShown: false,
        });
      } else {
        navigation.setOptions({
          drawerLockMode: "unlocked",
          headerShown: true,
        });
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerStyle: {
          backgroundColor: color.primary,
        },
        headerTintColor: color.white,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerBackTitleVisible: false,
      }}
    >
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
          headerTitle: "News",
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
