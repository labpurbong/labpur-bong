/* ============================================
   LABPUR BONG — Firebase Configuration
   Replace the placeholder values below with
   your Firebase project config from:
   console.firebase.google.com → Project Settings
   ============================================ */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Helper: Check if Firebase is configured
function isFirebaseConfigured() {
  return firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY";
}
