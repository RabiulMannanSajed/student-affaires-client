import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import app from "../Pages/firebase/irebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //    this is for create an use
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //    this is for signIn(login) an user
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //    this is for logOut an user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //  this is for the update an user by his name and photo
  const UpdateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  //   this is watch is user is created or not if the user created then go inside of this
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user", currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  //    data will pass from here
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    UpdateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
