import './firebaseConfig';
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore();

export const createPost = async (title, text, createdBy, thumbnail) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      title,
      text,
      date: new Date(),
      createdBy,
      thumbnail,
    });
    console.log("Document written with ID: ", docRef.id);
  }
  catch (error) {
    console.error("Error adding document: ", error);
  }
}