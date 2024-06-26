import { signInAnonymously } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./config/firebase";

export const extractUserData = (authData) => {
  try {
    if (authData.user)
      return {
        uid: authData.user.uid,
        email: authData.user.email,
        displayName: authData.user.displayName,
        photoURL: authData.user.photoURL,
        isAnonymous: authData.user.isAnonymous,
        phoneNumber: authData.user.phoneNumber,
        providerId: authData.user.providerId,
      };
    else {
      return {
        uid: authData.uid,
        email: authData.email,
        displayName: authData.displayName,
        photoURL: authData.photoURL,
        isAnonymous: authData.isAnonymous,
        phoneNumber: authData.phoneNumber,
        providerId: authData.providerId,
      };
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const continueAsGuest = async (auth) => {
  try {
    const authData = await signInAnonymously(auth);

    return extractUserData(authData);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addDestination = async (db, destination) => {
  try {
    const destinationRef = await addDoc(
      collection(db, "destinations"),
      destination
    );
    console.log("Document written with ID: ", destinationRef.id);
    return destinationRef;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const collectUserPrompts = async (db, propmt) => {
  try {
    const propmtRef = await addDoc(collection(db, "prompts"), propmt);
    console.log("Document written with ID: ", propmtRef.id);
    return propmtRef;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getimageURL = async (imgid, path) => {
  const _ref = ref(storage, path + imgid);
  let url = null;

  try {
    url = await getDownloadURL(_ref);
    return { src: url, error: null };
  } catch (e) {
    return { src: null, error: e };
  }
};
