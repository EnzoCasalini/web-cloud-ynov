import './firebaseConfig';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {getDefaultImageUrl} from "./storage_upload_file";
const db = getFirestore();

export const createPost = async (title, text, createdBy, thumbnail) => {
  if (!thumbnail) {
    thumbnail = await getDefaultImageUrl("thumbnail");
  }

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