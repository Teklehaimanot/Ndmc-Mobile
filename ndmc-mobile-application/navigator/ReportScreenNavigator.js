import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Reports from "../screens/Reports/Reports";

const Stack = createNativeStackNavigator();
const ReportScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Reports"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Reports" component={Reports} />
    </Stack.Navigator>
  );
};

export default ReportScreenNavigator;
