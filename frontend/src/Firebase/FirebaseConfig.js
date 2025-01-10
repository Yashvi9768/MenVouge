import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to authenticate user and verify role
async function authenticateUser(email, password) {
  try {
    // Sign in user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Retrieve the user's role from Firestore
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    const userRole = userDoc.data().role;

    // Check the user's role
    if (userRole === "admin") {
      console.log("User is an admin");
      // Grant admin access (e.g., redirect to admin panel)
      return { isAdmin: true };
    } else {
      console.log("User is not an admin");
      // Deny access to admin panel or handle as needed
      return { isAdmin: false };
    }
  } catch (error) {
    console.error("Authentication error:", error);
    // Handle authentication error (e.g., display an error message)
    throw error;
  }
}

// Function to sign out the user
async function signOutUser() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    // Perform additional actions after signing out
  } catch (error) {
    console.error("Sign out error:", error);
    // Handle sign-out error
    throw error;
  }
}

// Export the functions and initialized services
export { app, auth, db, storage, authenticateUser, signOutUser };
