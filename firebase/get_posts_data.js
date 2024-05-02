import "./firebaseConfig"
import {collection, getDocs, getFirestore} from "firebase/firestore";

const db = getFirestore();

export const getPostsData = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map((doc) => (
    {id: doc.id, ...doc.data()}
  ));
}