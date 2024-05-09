import {Alert, Button, Image, Pressable, Text, TextInput, View} from 'react-native';
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName || '');
        setImage(user.photoURL || '');
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);


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

    const image = pickerResult.assets[0].uri;
    setImage(image);
    await updateUserPicture(image);
  };

  const updateUserName = () => {
    if (displayName.length < 3 || displayName.length > 20) {
      console.log('Display name must be between 3 and 20 characters');
      return;
    }

    updateProfile(auth.currentUser, {displayName}).then(() => {
      console.log('Display name updated successfully');
    }).catch((error) => {
      console.error(error);
      console.log('Failed to update display name');
    });
  };

  const updateUserPicture = async (uri) => {
    let imageUrl = '';
    if (uri) {
      imageUrl = await uploadToFirebase(uri);
    }

    updatePhotoURL(imageUrl).then(() => {
      setImage(imageUrl);
      console.log('Profile picture updated successfully');
    }).catch((error) => {
      console.error(error);
      console.log('Failed to update profile picture');
    });
  };

  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container2}>
      {user ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.profileTitle}>Profile</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>UID: {user.uid}</Text>
          <Text style={styles.text}>Display Name: {user.displayName}</Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            style={styles.input}
            placeholder="Display Name"
          />
          <Pressable onPress={updateUserName} style={styles.button}>
            <Text style={styles.text}>Update Display Name</Text>
          </Pressable>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Button title="Pick an image from camera roll" onPress={pickImage} />
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
};

export default Profile;
