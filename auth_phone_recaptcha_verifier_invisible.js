import { getAuth, RecaptchaVerifier } from "firebase/auth";
import {onSignInSubmit} from "./auth_signin_phone";

const auth = getAuth();
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    onSignInSubmit();
  }
});
