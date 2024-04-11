import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import {signup} from "./auth_signup_password";
import {signin} from "./auth_signin_password";
import {loginWithPhoneNumber} from "./auth_signin_phone";
import {verifyCode} from "./auth_phone_verify_code";
import {signinWithGithub} from "./auth_github_signin_popup";

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      {/* <Toast visible={true}>Thanks for subscribing!</Toast> */}
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <Pressable onPress={() => signup(email, password)} style = {styles.button}>
        <Text>Sign Up!</Text>
      </Pressable>
      <Pressable onPress={() => signin(email, password)} style = {styles.button}>
        <Text>Sign In!"</Text>
      </Pressable>
      <Text>____Github_____</Text>
      <Pressable onPress={() => signinWithGithub()} style = {styles.button}>
        <Text>Sign In with Github</Text>
      </Pressable>

      <Text>____Phone_____</Text>
      <Text>Phone number</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
      ></TextInput>
      <Pressable id="sign-in-button-phone" onPress={() => loginWithPhoneNumber(phone)} style = {styles.button}>
        <Text>Sign In with Phone</Text>
      </Pressable>
      <div id="recaptcha-container"></div>
      <Text>Code</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
      ></TextInput>
      <Pressable onPress={() => verifyCode(code)} style = {styles.button}>
        <Text>Check Code !</Text>
      </Pressable>

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
