
// Firebase setup
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, increment, runTransaction } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiy2Abb6OPUDEmGvW01ZQJaaKhQbfyU-c",
  authDomain: "hanzalas-portfolio.firebaseapp.com",
  projectId: "hanzalas-portfolio",
  storageBucket: "hanzalas-portfolio.appspot.com",
  messagingSenderId: "1035205593092",
  appId: "1:1035205593092:web:6438cad8a60d818c380d51",
  measurementId: "G-XBB5NSCV6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to increment views using transaction (more reliable)
const incrementViews = async () => {
  try {
    const viewsRef = doc(db, "Views", "001");

    return runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(viewsRef);

      if (!docSnap.exists()) {
        transaction.set(viewsRef, { viewsCount: 1 });
      } else {
        const newCount = (docSnap.data()["viewsCount"] || 0) + 1;
        transaction.update(viewsRef, { viewsCount: newCount });
      }

      return true;
    }).then(() => {
      console.log("View count incremented successfully using transaction");
      return true;
    }).catch((error) => {
      console.error("Error incrementing views with transaction:", error);
      return false;
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return false;
  }
};

// Function to get views
const getViews = async () => {
  try {
    const viewsRef = doc(db, "Views", "001");
    const viewsSnap = await getDoc(viewsRef);

    if (viewsSnap.exists()) {
      const data = viewsSnap.data();
      console.log("Views document data:", data);

      if (typeof data.viewsCount === 'number') {
        return data.viewsCount;
      } else {
        console.error("No valid view count field found in document!");
        return 0;
      }
    } else {
      console.error("No views document found!");
      return 0;
    }
  } catch (error) {
    console.error("Error getting views:", error);
    return 0;
  }
};

export { db, collection, getDocs, doc, getDoc, incrementViews, getViews, runTransaction };
