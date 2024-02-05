import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/Home";
import Post from "../components/NewsDetail";

const Stack = createNativeStackNavigator();
const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="details" component={Post} />
    </Stack.Navigator>
  );
};
export default HomeScreenNavigator;
