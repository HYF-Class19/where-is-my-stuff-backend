import { async } from "@firebase/util";
import { initializeApp } from "firebase/app"; // Firebase core SDK
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Firebase Authentication SDK
import { getDatabase } from "firebase/database"; // Firebase Realtime Database SDK
import { getFunctions } from "firebase/functions"; // Firebase Cloud Functions SDK
import { getStorage } from "firebase/storage"; // Firebase Cloud Storage SDK

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyD-rQFOxv52LCGmt4yoxA-bU0obnsEUBFE",
  authDomain: "where-is-my-stuff-89c9a.firebaseapp.com",
  databaseURL:
    "https://where-is-my-stuff-89c9a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "where-is-my-stuff-89c9a",
  storageBucket: "where-is-my-stuff-89c9a.appspot.com",
  messagingSenderId: "1006547574912",
  appId: "1:1006547574912:web:f065824bf48407d3ed4665",
  measurementId: "G-LHS73Q61YX",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const functions = getFunctions(app);
const storage = getStorage(app);

// Handle Google sign-in button click

const singWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // const user = result.user;
    // console.log(user);
    console.log("User signed in successfully!", result);
  } catch (error) {
    console.error("Error singing in", error);
  }
};

// Write data to Firebase realtime database

const writeUserData = async (userId, name, email, imageUrl) => {
  await set(ref(database, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
};

// Read data from Firebase realtime database

const readUserData = async (userId) => {
  const snapshot = await get(ref(database, "users/" + userId));
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
};

// Call a Firebase Cloud Function

const callFunction = async () => {
  const callable = httpsCallable(functions, "helloWorld");
  const result = await callable();
  console.log(result.data);
};

// Upload lend out items to Firebase Cloud Storage

const uploadItem = async (file) => {
  const storageRef = ref(storage, "items/" + file.name);
  const uploadTask = await uploadBytesResumable(storageRef, file);
  console.log("Upload is " + uploadTask.snapshot.bytesTransferred + " done");
  console.log("Download URL: " + uploadTask.snapshot.downloadURL);
};

// Download lend out items from Firebase Cloud Storage

const downloadItem = async (file) => {
  const storageRef = ref(storage, "items/" + file.name);
  const url = await getDownloadURL(storageRef);
  console.log(url);
};

// Delete lend out items from Firebase Cloud Storage

const deleteItem = async (file) => {
  const storageRef = ref(storage, "items/" + file.name);
  await deleteObject(storageRef);
};

// update lend out items from firebase Cloud storage

const updateItem = async (file) => {
  const storageRef = ref(storage, "items/" + file.name);
  const metadata = {
    customMetadata: {
      "updated-by": "user",
    },
  };
  await updateMetadata(storageRef, metadata);
};

const storageRef = ref(storage);
const listRef = ref(storageRef, "items");

const list = listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
    });

    // console.log(res);
    // console.log(res.items[0].name);
  })
  .catch((error) => {
    console.log(error);
  });

// export function

export {
  singWithGoogle,
  writeUserData,
  readUserData,
  callFunction,
  uploadItem,
  downloadItem,
  deleteItem,
  updateItem,
  list,
};
