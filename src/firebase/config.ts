// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeDryXYoN5Ut65ezbjm0NKgsc55cVNd5w",
  authDomain: "fire-gallery-84947.firebaseapp.com",
  projectId: "fire-gallery-84947",
  storageBucket: "fire-gallery-84947.appspot.com",
  messagingSenderId: "742252252251",
  appId: "1:742252252251:web:b1b4efac1d34a882cf837e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
