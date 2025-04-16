import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAUytCg9LKEpObjuAF31lKrURDMiNiubVQ",
  authDomain: "otaps-45904.firebaseapp.com",
  databaseURL:
    "https://otaps-45904-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "otaps-45904",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue };
