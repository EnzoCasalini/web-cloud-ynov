import './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
export const signup = (email, password, callback) => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
          console.log(user)
          console.log("signup success")
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
      });
}