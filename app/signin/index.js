import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {signin} from "../../firebase/auth_signin_password";
import {signinWithGithub} from "../../firebase/auth_github_signin_popup";
import {loginWithPhoneNumber} from "../../firebase/auth_signin_phone";
import {verifyCode} from "../../firebase/auth_phone_verify_code";
import {useState} from "react";
import "../../style/styles";
import {styles} from "../../style/styles";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container}>
      <ScrollView style={styles.form}>
        <Text style={styles.h2}>🪐 Login</Text>
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
        <Pressable onPress={() => signin(email, password)} style={styles.button}>
          <Text style={styles.text}>Login !</Text>
        </Pressable>
        <Text style={styles.h3}> OR </Text>
        <Pressable onPress={() => signinWithGithub()} style={styles.sentence}>
          <Ionicons name="logo-github" size={24} color="#e5e0e0" style={styles.icon}/>
          <Text style={styles.text}>Login with Github</Text>
        </Pressable>
        <Text style={styles.h3}> OR </Text>
        <View style={styles.sentencePhone}>
          <Ionicons name="call-outline" size={24} color="#e5e0e0" style={styles.icon}/>
          <Text style={styles.text}>Login with a phone number</Text>
        </View>
        <TextInput
          onChangeText={setPhone}
          value={phone}
          style={styles.input}
        />
        <Pressable id="sign-in-button-phone" onPress={() => loginWithPhoneNumber(phone)} style={styles.button}>
          <Text style={styles.text}>Login !</Text>
        </Pressable>
        <div id="recaptcha-container"></div>
        <Text style={styles.labelCode}>Code</Text>
        <TextInput
          onChangeText={setCode}
          value={code}
          style={styles.input}
        />
        <Pressable onPress={() => verifyCode(code)} style={styles.button}>
          <Text style={styles.text}>Check Code !</Text>
        </Pressable>
        <Link href="/signup" style={styles.redirectLink}>You don't have an account ? Sign Up</Link>
      </ScrollView>
    </LinearGradient>
  );
}

export default SignIn;
