import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../src/config/firebase";
export const signUPWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("successfully signed up", user);
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("something went wrong", errorCode, errorMessage);
      throw error;
    });
};
export const loginWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Successfully signed in", user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("something went wrong", errorCode, errorMessage);
      throw error;
    });
};

export const logOut = () => {
  return signOut(auth)
    .then(() => {
      console.log("signout successful");
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        "something went wrong, could not sign you out",
        errorCode,
        errorMessage
      );
      throw error;
    });
};
