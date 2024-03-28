import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import {signup} from "./auth_signup_password";
import {signin} from "./auth_signin_password";

export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
    <View style={styles.container}>
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
        <Button title="Sign Up !" onPress={() => signup(email, password)}></Button>
        <Button title="Sign In !" onPress={() => signin(email, password)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
