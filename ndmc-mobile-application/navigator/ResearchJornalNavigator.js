import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VisionMession from "../components/VisionMission";
import ResearchJornal from "../screens/researchJornal/ResearchJornal";

const Stack = createNativeStackNavigator();
const ResearchJornalNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ResearchJornal">
      <Stack.Screen
        name="ResearchJornal"
        component={ResearchJornal}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="aboutDetail" component={VisionMession} />
    </Stack.Navigator>
  );
};
export default ResearchJornalNavigator;
