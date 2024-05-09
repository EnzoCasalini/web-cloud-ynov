import './firebaseConfig';
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore();

export const addComment = async (postId, userId, commentText, createdBy) => {
  try {
    const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
      userId,
      commentText,
      createdAt: new Date(),
      createdBy,
    });
    console.log("Comment added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding comment: ", error);
  }
};