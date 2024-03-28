import { getAuth, RecaptchaVerifier, signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import './firebaseConfig';

// Initialiser Firebase
const auth = getAuth();
auth.languageCode = 'fr';
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});

export const sendVerificationCode = async (phoneNumber, setVerificationId, setMessage) => {
  try {
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, window.recaptchaVerifier);
    setVerificationId(verificationId);
    setMessage("Code de vérification envoyé.");
  } catch (error) {
    setMessage(`Erreur lors de l'envoi du code : ${error.message}`);
    console.log(error);
  }
};

export const verifyCode = async (verificationId, code, setMessage) => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    await signInWithCredential(auth, credential);
    setMessage("Authentification réussie !");
  } catch (error) {
    setMessage(`Erreur lors de la vérification du code : ${error.message}`);
    console.log(error);
  }
};
