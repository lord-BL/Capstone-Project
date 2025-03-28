import create from "zustand";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../config/firebase";

const auth = getAuth(app);
