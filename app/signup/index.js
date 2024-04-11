import {Pressable, Text, TextInput, View} from 'react-native';
import {signup} from "../../firebase/auth_signup_password";
import {useState} from "react";
import "../../style/styles";
import {styles} from "../../style/styles";
import {LinearGradient} from "expo-linear-gradient";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.h2}>🛸  Register</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          style={styles.input}
        />
        <Pressable onPress={() => signup(email, password)} style={styles.button}>
          <Text style={styles.text}>Sign Up !</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

export default SignUp;
