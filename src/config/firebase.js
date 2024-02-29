import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAecfcCsCj9TSrD8FJaIh9VewpR_x7ENWg",
  authDomain: "trek-ai.firebaseapp.com",
  projectId: "trek-ai",
  storageBucket: "trek-ai.appspot.com",
  messagingSenderId: "992235304748",
  appId: "1:992235304748:web:fee7666c2f30882e6dde89",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
