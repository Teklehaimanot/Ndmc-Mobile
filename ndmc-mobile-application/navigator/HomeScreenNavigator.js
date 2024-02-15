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
      <Stack.Screen
        name="details"
        component={Post}
        options={{
          headerShown: true, // Show stack header for Details screen
          headerTitle: "Details", // Optionally set a custom title for the stack header
          headerLeft: null, // Optionally remove any left header component
          drawerLabel: () => null, // Hide drawer label for Details screen
          drawerIcon: () => null, // Hide drawer icon for Details screen
        }}
      />
    </Stack.Navigator>
  );
};
export default HomeScreenNavigator;
