import './firebaseConfig';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

const auth = getAuth();
export const signup = (email, password, displayName, photoUrl) => {

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("signup success")

      const profileUpdate = {
        displayName: displayName
      };

      if (photoUrl) {
        profileUpdate.photoURL = photoUrl;
      }

      return updateProfile(user, profileUpdate).then(() => {
        console.log("Profile updated");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
}