import {useEffect, useState} from "react";
import {createPost} from "../../firebase/add_post_data";
import {Pressable, TextInput, View, Text, Image} from "react-native";
import { styles } from "../../style/styles";
import {getAuth} from "firebase/auth";
import { router } from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import {useAuth} from "../contexts/authContext";
import {uploadToFirebase} from "../../firebase/storage_upload_file";

const auth = getAuth();

const AddPost = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const pickImage = async () => {
    const permissionToAccessGallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionToAccessGallery.granted === false) {
      console.log('Permission to access camera roll is required !');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    const image = pickerResult.assets[0].uri;
    const thumbnail = await getThumbnailUrl(image);
    setThumbnail(thumbnail);
  };

  const getThumbnailUrl = async (uri) => {
    let imageUrl = '';
    if (uri) {
      imageUrl = await uploadToFirebase(uri, "thumbnail");
    }
    return imageUrl;
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('You must be signed in to create a post.');
      router.replace('/signin');
      return;
    }

    if (title.trim() === '' || text.trim() === '') {
      alert('Please, fill the required fields.');
      return;
    }

    try {
      await createPost(title, text, user.uid, thumbnail);
      router.replace('/');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Failed to add the post: ', error);
      alert('Failed to create the post.');
    }
  };

  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.formContainer}>
      <Text style={styles.h1}>Add a new post</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title :</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter the title"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Text :</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={4}
          placeholder="Enter the text"
        />
      </View>

      <View style={styles.inputContainer}>
        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.text}>Pick a thumbnail !</Text>
        </Pressable>
        { thumbnail ? <Image source={{ uri: thumbnail }} style={styles.thumbnailForm} /> : null }
      </View>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </LinearGradient>
  );
};

export default AddPost;
