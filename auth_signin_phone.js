// authentication_phone.js
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import './firebaseConfig';

const auth = getAuth();
const appVerifier = window.recaptchaVerifier;

export const sendVerificationCode = async (phone, setConfirmationResult, setMessage) => {
  try {
    const result = await signInWithPhoneNumber(auth, phone, appVerifier);
    setConfirmationResult(result);
    setMessage("Code de vérification envoyé.");
  } catch (error) {
    setMessage(`Erreur lors de l'envoi du code : ${error.message}`);
  }
};

export const verifyCode = async (code, confirmationResult, setMessage) => {
  try {
    const result = await confirmationResult.confirm(code);
    // Code vérifié avec succès, utilisateur connecté
    setMessage("Authentification réussie !");
  } catch (error) {
    setMessage(`Erreur lors de la vérification du code : ${error.message}`);
  }
};
