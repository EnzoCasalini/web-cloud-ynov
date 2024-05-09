import {Pressable, Text, View} from 'react-native';
import {styles} from "../style/styles";
import {LinearGradient} from "expo-linear-gradient";
import {Link} from "expo-router";
import {useEffect, useState} from "react";
import {getPostsData} from "../firebase/get_posts_data";
import { router } from "expo-router";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostsData();
      console.log(data);
      setPosts(data);
    }
    fetchData();
  }, []);


  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container}>
      <View style={styles.container3}>
        <Text style={styles.h1}>Welcome to my app !</Text>
        <Link href="posts/add_post" style={styles.linkUnderline}>Start by adding a new post !</Link>
      </View>
      <View style={styles.container3}>
        { posts.map((post, index) => {
          return (
          <Pressable key={index} style={styles.post} onPress={() => router.replace(`posts/${post.id}`)}>
            <Text style={styles.h2}>{post.title}</Text>
            <Text style={styles.text}>{post.text}</Text>
          </Pressable>
          )
        })}
      </View>
    </LinearGradient>
  );
}