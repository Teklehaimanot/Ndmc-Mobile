import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EvidenceBrief from "../screens/evidenceBrief/EvidenceBrief";
import EvidenceDetail from "../components/EvidenceDetail";

const Stack = createNativeStackNavigator();
const EvidenceBriefNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="EvidencBrief"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="EvidenceBrief" component={EvidenceBrief} />
      <Stack.Screen name="EvidenceDetails" component={EvidenceDetail} />
    </Stack.Navigator>
  );
};
export default EvidenceBriefNavigator;
