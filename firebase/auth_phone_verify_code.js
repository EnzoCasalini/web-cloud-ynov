import { router } from 'expo-router';

export const verifyCode = async (code) => {
  window.confirmationResult.confirm(code).then((result) => {
    const user = result.user;
    console.log("User signed in successfully");
    router.replace('/profile');
    return true;
    // ...
  }).catch((error) => {
    console.log("User couldn't sign in (bad verification code?)");
    return false;
  });
};