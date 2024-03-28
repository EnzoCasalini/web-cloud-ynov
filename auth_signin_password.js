import './firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
export const signin = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            callback("User has been signed in successfully !");
        })
        .catch((error) => {
            const errorMessage = error.message;
            callback("Failed to sign in: " + errorMessage);
        });
}
