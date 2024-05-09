import "../../firebase/firebaseConfig";
import {Text, TextInput, View, Image, Button, Pressable} from 'react-native';
import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { styles } from "../../style/styles";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import {uploadToFirebase} from "../../firebase/storage_upload_file";
import {updatePhotoURL} from "../../firebase/auth_update_photo_url";

const auth = getAuth();

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [image, setImage] = useState(null);
  const [hasName, setHasName] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        if (user.displayName) {
          setDisplayName(user.displayName);
          setHasName(true);
        }
        if (user.photoURL) {
          setImage(user.photoURL);
          setHasPhoto(true);
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  const onLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const updateUserName = (displayName) => {
    verifyDisplayName(displayName);

    if (displayName) {
      updateProfile(auth.currentUser,{
        displayName: displayName,
      }).then(() => {
        setHasName(true);
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  const updateUserPicture = (photoURL) => {
    if (photoURL) {
      uploadToFirebase(photoURL).then((url) => {
        updatePhotoURL(url).then(() => {
          setHasPhoto(true);
        });
      });
    }
  }

  const verifyDisplayName = (displayName) => {
    if (!displayName) {
      console.log('Please enter a display name');
      return;
    }

    if (displayName.length < 3) {
      console.log('Display name must be at least 3 characters');
      return;
    }

    if (displayName.length > 20) {
      console.log('Display name must be less than 20 characters');
    }
  }

  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container2}>
      {user ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.profileTitle}>Profile</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>UID: {user.uid}</Text>
          {user.emailVerified ? (
            <Text style={styles.text}>Your email is verified :)</Text>
          ) : (
            <Text style={styles.text}>Your email is not verified yet :(</Text>
          )}
          {hasName && hasPhoto ? (
            <View>
              <Image source={{ uri: image }} style={styles.image} />
              <Text style={styles.text}>Display Name: {displayName}</Text>
            </View>
          ) : hasName ? (
            <View style={styles.form}>
              <Image source={{ uri: image }} style={styles.image} />
              <Button title="Pick a different image" onPress={pickImage} />
              <Pressable onPress={() => updateUserPicture(image)} style={styles.button}>
                <Text style={styles.text}>Update Picture</Text>
              </Pressable>
            </View>
          ) : hasPhoto ? (
            <View style={styles.form}>
              <Text style={styles.label}>Display Name</Text>
              <TextInput
                value={displayName}
                onChangeText={setDisplayName}
                style={styles.input}
              />
              <Pressable onPress={() => updateUserName(displayName)} style={styles.button}>
                <Text style={styles.text}>Update DisplayName</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.label}>Display Name</Text>
              <TextInput
                value={displayName}
                onChangeText={setDisplayName}
                style={styles.input}
              />
              <Pressable onPress={() => updateUserName(displayName)} style={styles.button}>
                <Text style={styles.text}>Update DisplayName</Text>
              </Pressable>
              <Button title="Pick an image from camera roll" onPress={pickImage} />
              <Pressable onPress={() => updateUserPicture(image)} style={styles.button}>
                <Text style={styles.text}>Update Picture</Text>
              </Pressable>
            </View>
          )}
          <Link href="/signin" style={styles.redirectLink} onPress={onLogout}>Logout</Link>
        </View>
      ) : (
        <View style={styles.userInfoContainer}>
          <Text style={styles.h2}>Profile</Text>
          <Text style={styles.text}>You are not logged in</Text>
          <Link href="/signin" style={styles.redirectLink}>Login</Link>
        </View>
      )}
    </LinearGradient>
  );
}

export default Profile;
