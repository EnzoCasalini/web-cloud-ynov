export const verifyCode = async (code) => {
  window.confirmationResult.confirm(code).then((result) => {
    // User signed in successfully.
    const user = result.user;
    return true;
    // ...
  }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
    return false;
  });
};