import './firebaseConfig';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { router } from 'expo-router';
import {uploadToFirebase} from "./storage_upload_file";

const auth = getAuth();
export const signup = (email, password, displayName, photoUrl) => {

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("signup success")

      const profileUpdate = {
        displayName: displayName
      };

      let imageUrl = '';
      if (photoUrl) {
        imageUrl = await uploadToFirebase(photoUrl, "profile");
        profileUpdate.photoURL = imageUrl;
      }

      return updateProfile(user, profileUpdate).then(() => {
        console.log("Profile updated");
        router.replace('/profile');
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