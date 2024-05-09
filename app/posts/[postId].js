import {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";
import {getOnePostData} from "../../firebase/get_one_post_data";
import {Text, View} from "react-native";
import {styles} from "../../style/styles";
import {LinearGradient} from "expo-linear-gradient";
import {getAuth} from "firebase/auth";

const auth = getAuth();

const NewPost = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const local = useLocalSearchParams();

  useEffect(() => {
    const fetchPost = async () => {
      let res = await getOnePostData(local.postId);
      setPost(res);
    }
    fetchPost();
  }, [local.postId]);


  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container}>
      { post ? (
        <View style={styles.container2}>
          <Text style={styles.h1}>{post.title}</Text>
          <Text style={styles.text}>{post.text}</Text>
        </View>
      ) : (
        <View style={styles.container2}>
          <Text style={styles.h3}>Loading...</Text>
        </View>
      )}
    </LinearGradient>
  );

}


export default NewPost;