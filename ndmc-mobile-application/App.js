import "react-native-gesture-handler";
import * as React from "react";
import RootNavigator from "./navigator/RootNavigator";
import { Provider } from "react-redux";
import store from "./state/store";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
