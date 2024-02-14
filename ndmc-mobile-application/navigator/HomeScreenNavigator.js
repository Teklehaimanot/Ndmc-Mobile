import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/Home";
import Post from "../components/NewsDetail";

const Stack = createNativeStackNavigator();
const HomeScreenNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="details" component={Post} />
    </Stack.Navigator>
  );
};
export default HomeScreenNavigator;
