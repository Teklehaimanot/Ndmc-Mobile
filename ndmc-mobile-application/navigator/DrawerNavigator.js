import { createDrawerNavigator } from "@react-navigation/drawer";
import { color } from "../utilities/Colors";
import CustomSidebarMenu from "../components/DrawerContent";
import HomeScreenNavigator from "./HomeScreenNavigator";
import EvidenceBriefNavigator from "./EvidenceBriefNavigator";
import ReportScreenNavigator from "./ReportScreenNavigator";
import AboutScreenNavigator from "./AboutScreenNavigator";

const Drawer = createDrawerNavigator();
const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName="NDMC"
      screenOptions={{
        drawerActiveTintColor: color.white,
        drawerActiveBackgroundColor: color.hoveringBackground,
        drawerItemStyle: { marginVertical: 5 },
        drawerLabelStyle: { fontWeight: "bold", fontSize: 15 },

        headerStyle: {
          backgroundColor: color.primary,
        },
        headerTintColor: color.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="Home Page"
        component={HomeScreenNavigator}
        options={{ drawerLabel: "News And Events", title: "NDMC" }}
      />
      <Drawer.Screen
        name="Evidence Brief Page"
        component={EvidenceBriefNavigator}
        options={{
          drawerLabel: "Evidence For Action",
          title: "Evidence For Acition",
        }}
      />
      <Drawer.Screen
        name="Reports Page"
        component={ReportScreenNavigator}
        options={{ drawerLabel: "Reports", title: "Reports" }}
      />
      <Drawer.Screen
        name="About Page"
        component={AboutScreenNavigator}
        options={{ drawerLabel: "About", title: "About " }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
