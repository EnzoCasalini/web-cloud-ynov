import {useEffect, useState} from "react";
import {createPost} from "../../firebase/add_post_data";
import {Pressable, TextInput, View, Text} from "react-native";
import { styles } from "../../style/styles";
import {getAuth} from "firebase/auth";
import { router } from "expo-router";
import {LinearGradient} from "expo-linear-gradient";

const auth = getAuth();

const AddPost = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSubmit = async () => {
    if (!user) {
      alert('You must be signed in to create a post.');
      router.replace('/signin');
      return;
    }

    try {
      await createPost(title, text, user.uid);
      router.replace('/posts');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Failed to add the post: ', error);
      alert('Failed to create the post.');
    }
  };

  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container2}>
      <Text style={styles.label}>Title :</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter the title"
      />

      <Text style={styles.label}>Text :</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        multiline
        placeholder="Enter the text"
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </LinearGradient>
  );
};

export default AddPost;
