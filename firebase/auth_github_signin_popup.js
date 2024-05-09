import {getAuth, GithubAuthProvider, signInWithPopup} from "firebase/auth";
import provider from "./auth_github_provider_create";
import { router } from 'expo-router';

const auth = getAuth();
export const signinWithGithub = () => {
  console.log("Signing in with Github");
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log("Signed in with Github: ", user);
      router.replace('/profile');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    });
}