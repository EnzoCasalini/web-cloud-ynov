import {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";
import {getOnePostData} from "../../firebase/get_one_post_data";
import {Button, Image, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {styles} from "../../style/styles";
import {LinearGradient} from "expo-linear-gradient";
import {getAuth} from "firebase/auth";
import {getComments} from "../../firebase/get_comments";
import {useAuth} from "../contexts/authContext";
import {addComment} from "../../firebase/add_comment";

const auth = getAuth();

const NewPost = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const { user } = useAuth();

  const local = useLocalSearchParams();

  const fetchComments = async () => {
    const fetchedComments = await getComments(local.postId);
    setComments(fetchedComments);
  };

  useEffect(() => {
    const fetchPost = async () => {
      let res = await getOnePostData(local.postId);
      setPost(res);
      fetchComments();
    }
    fetchPost();
  }, [local.postId]);

  const handleAddComment = async () => {
    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }

    if (newComment.trim() !== '') {
      await addComment(local.postId, user.uid, newComment, user.displayName);
      setNewComment('');
      fetchComments();
    } else {
      alert("The comment must not be empty.");
    }
  };

  const firstLetterToUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container}>
      { post ? (
        <>
        <Image source={{uri: post.thumbnail}} style={styles.thumbnail} />
        <ScrollView style={styles.container2}>
          <Text style={styles.h1}>{post.title}</Text>
          <Text style={styles.text}>{post.text}</Text>
          <View style={styles.commentSection}>
            <TextInput
              style={styles.input}
              value={newComment}
              onChangeText={setNewComment}
              multiline = {true}
              numberOfLines = {4}
              placeholder="Write a comment..."
            />
            <Pressable style={styles.postPageButton} onPress={handleAddComment} >
              <Text style={styles.text}>Add a comment</Text>
            </Pressable>
            {comments.map((comment, index) => (
              <View key={index} style={styles.commentContainer}>
                <Text style={styles.userName}>{firstLetterToUpperCase(comment.createdBy)} :</Text>
                <Text style={styles.text}>{comment.commentText}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        </>
      ) : (
        <View style={styles.container2}>
          <Text style={styles.h3}>Loading...</Text>
        </View>
      )}
    </LinearGradient>
  );

}


export default NewPost;