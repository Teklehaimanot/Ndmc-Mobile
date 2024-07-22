import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EvidenceBrief from "../screens/evidenceBrief/EvidenceBrief";
import EvidenceDetail from "../components/EvidenceDetail";
import { color } from "../utilities/Colors";

const Stack = createNativeStackNavigator();
const EvidenceBriefNavigator = ({ navigation }) => {
  React.useLayoutEffect(() => {
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
        name="EvidenceBrief"
        component={EvidenceBrief}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EvidenceDetails"
        component={EvidenceDetail}
        options={{
          headerShown: true,
          headerTitle: "Evidence Brief",
        }}
      />
    </Stack.Navigator>
  );
};
export default EvidenceBriefNavigator;
