import './firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';

const auth = getAuth();
export const signin = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("signin success");
          router.replace('/profile');
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
      });
}
