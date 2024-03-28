import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import Toast from 'react-native-root-toast';
import {useState} from "react";
import {signup} from "./auth_signup_password";
import {signin} from "./auth_signin_password";
import {sendVerificationCode, verifyCode} from "./auth_signin_phone";

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSignUp = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    signup(email, password, (msg) => setMessage(msg));
  };

  const handleSignIn = () => {
    signin(email, password, (msg) => setMessage(msg));
  };

  const handleSendVerificationCode = () => {
    sendVerificationCode(phone, (result) => setConfirmationResult(result), (msg) => setMessage(msg));
  };

  // Adjust verifyCode to match the expected function signature and use verificationId
  const handleVerifyCode = () => {
    if (confirmationResult) {
      verifyCode(code, (result) => setConfirmationResult(result), (msg) => setMessage(msg));
    } else {
      setMessage("Erreur: Pas de verificationId disponible. Veuillez d'abord envoyer le code.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email Authentication</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={() => handleSignUp(email, password, setMessage)} />
      <Button title="Sign In" onPress={() => handleSignIn(email, password, setMessage)} />
      <Text>Phone Authentication</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        placeholder="Phone Number"
      />
      <Button title="Send Verification Code" onPress={handleSendVerificationCode} />
      {confirmationResult && (
        <>
          <TextInput
            style={styles.input}
            onChangeText={setCode}
            value={code}
            placeholder="Verification Code"
          />
          <Button title="Verify Code" onPress={handleVerifyCode} />
        </>
      )}
      {/* Utiliser un état pour contrôler l'affichage du Toast peut nécessiter une logique supplémentaire pour le rendre et le cacher correctement. */}
      {message !== '' && <Toast visible={true} position={50} shadow={false} animation={false} hideOnPress={true}>{message}</Toast>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: 'red',
  },
});
