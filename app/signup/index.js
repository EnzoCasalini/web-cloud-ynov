import {Alert, Image, Pressable, Text, TextInput, View} from 'react-native';
import {signup} from "../../firebase/auth_signup_password";
import {useState} from "react";
import "../../style/styles";
import {styles} from "../../style/styles";
import {LinearGradient} from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import {uploadToFirebase} from "../../firebase/storage_upload_file";
import {updatePhotoURL} from "../../firebase/auth_update_photo_url";
import {Link} from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({ email: false, password: false, displayName: false });

  const pickImage = async () => {
    const permissionToAccessGallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionToAccessGallery.granted === false) {
      Alert.alert("Permission Required", "Permission to access camera roll is required !");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    setProfileImage(pickerResult.assets[0].uri);
  };

  const validateInputs = () => {
    let hasError = false;
    const newErrors = { email: !email, password: !password, displayName: !displayName };
    setErrors(newErrors);

    Object.keys(newErrors).forEach(key => {
      if (newErrors[key]) {
        hasError = true;
      }
    });

    return !hasError;
  };

  const handleSignUp = async () => {
    if (validateInputs()) {
      signup(email, password, displayName, profileImage);
    } else {
      console.log('Please, fill in the required fields !');
    }
  };

  const getInputStyle = (fieldName) => ({
    ...styles.input,
    borderColor: errors[fieldName] ? '#d0001c' : '#3b3b3b'
  });

  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.h2}>🛸 Register</Text>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          value={email}
          onChangeText={text => { setEmail(text); setErrors(prev => ({ ...prev, email: false })); }}
          style={getInputStyle('email')}
        />
        { errors.email && <Text style={styles.error}>Email is required</Text> }
        <Text style={styles.label}>Password *</Text>
        <TextInput
          value={password}
          onChangeText={text => { setPassword(text); setErrors(prev => ({ ...prev, password: false })); }}
          secureTextEntry={true}
          style={getInputStyle('password')}
        />
        { errors.password && <Text style={styles.error}>Password is required</Text> }
        <Text style={styles.label}>Display Name *</Text>
        <TextInput
          value={displayName}
          onChangeText={text => { setDisplayName(text); setErrors(prev => ({ ...prev, displayName: false })); }}
          style={getInputStyle('displayName')}
        />
        { errors.displayName && <Text style={styles.error}>Display name is required</Text> }
        <Text style={styles.label}>Profile picture</Text>
        <Pressable onPress={pickImage} style={styles.button}>
          <Text style={styles.text}>Pick an Image</Text>
        </Pressable>
        {
          profileImage && <Image source={{ uri: profileImage }} style={styles.image} />
        }
        <Pressable onPress={handleSignUp} style={styles.button}>
          <Text style={styles.text}>Sign Up !</Text>
        </Pressable>
        <Link href="/signin" style={styles.redirectLink}>Already have an account? Sign In</Link>
      </View>
    </LinearGradient>
  );
}

export default SignUp;
