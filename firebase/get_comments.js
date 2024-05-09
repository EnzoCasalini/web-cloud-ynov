import './firebaseConfig';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
const db = getFirestore();

export const getComments = async (postId) => {
  const q = query(collection(db, "posts", postId, "comments"));
  const querySnapshot = await getDocs(q);
  const comments = [];

  querySnapshot.forEach((doc) => {
    comments.push(doc.data());
  });

  return comments;
};