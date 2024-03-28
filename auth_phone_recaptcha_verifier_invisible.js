import { getAuth, RecaptchaVerifier } from "firebase/auth";
import {onSignInSubmit} from "./auth_signin_phone";

const auth = getAuth();
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    onSignInSubmit();
  }
});
