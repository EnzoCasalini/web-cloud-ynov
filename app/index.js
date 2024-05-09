import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {styles} from "../style/styles";
import {LinearGradient} from "expo-linear-gradient";
import {Link} from "expo-router";
import {useEffect, useState} from "react";
import {getPostsData} from "../firebase/get_posts_data";
import {router} from "expo-router";
import {useAuth} from "./contexts/authContext";

export default function App() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostsData();
      console.log(data);
      setPosts(data);
    }
    fetchData();
  }, []);

  const navigateToAddPost = () => {
    if (!user) {
      alert('You must be signed in to create a post.');
      return;
    }
    router.replace('/posts/add_post');
  }

  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container}>
      <ScrollView style={styles.mainScrollView}>
        <View style={styles.container3}>
          <Text style={styles.h1}>Welcome to this insane blog !</Text>
          <Pressable onPress={navigateToAddPost} style={styles.linkUnderline}>Start by adding a new post !</Pressable>
        </View>
        <View style={styles.container3}>
          {posts.map((post, index) => {
            return (
              <Pressable key={index} style={styles.post} onPress={() => router.replace(`posts/${post.id}`)}>
                <Text style={styles.h2}>{post.title}</Text>
                <Image source={{uri: post.thumbnail}} style={styles.thumbnailForm} />
                <Text style={styles.text}>{post.text}</Text>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}