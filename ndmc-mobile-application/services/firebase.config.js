import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  REACT_APP_apikey,
  REACT_APP_authDomain,
  REACT_APP_projectId,
  REACT_APP_storageBucket,
  REACT_APP_messagingSenderId,
  REACT_APP_appId,
  REACT_APP_measurementId,
} from "@env";

const firebaseConfig = {
  apiKey: REACT_APP_apikey,
  authDomain: REACT_APP_authDomain,
  databaseURL: "https://ndmc-mobile-5a8b5-default-rtdb.firebaseio.com",
  projectId: REACT_APP_projectId,
  storageBucket: "ndmc-mobile-5a8b5.appspot.com",
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
  measurementId: REACT_APP_measurementId,
};
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);
