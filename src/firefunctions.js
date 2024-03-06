import { signInAnonymously } from "firebase/auth";

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
