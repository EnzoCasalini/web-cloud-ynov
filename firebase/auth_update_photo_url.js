import {getAuth, updateProfile} from "firebase/auth";

const auth = getAuth();

export const updatePhotoURL = async (photoURL) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: photoURL
    });
  }
  catch (error) {
    console.error(error);
  }
}