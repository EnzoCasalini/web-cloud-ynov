import './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
export const signup = (email, password, callback) => {

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            callback("Your account has been created successfully !");
        })
        .catch((error) => {
            const errorMessage = error.message;
            callback("Failed to sign up: " + errorMessage);
        });
}