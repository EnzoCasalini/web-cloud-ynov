import "../../firebase/firebaseConfig";
import {Text, View} from 'react-native';
import {getAuth} from "firebase/auth";
import {useEffect, useState} from "react";
import {Link} from "expo-router";
import {styles} from "../../style/styles";
import {LinearGradient} from "expo-linear-gradient";

const auth = getAuth();

const Profile = () => {
  const[user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
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

  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container2}>
      {user ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.profileTitle}>Profile</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>UID: {user.uid}</Text>
          {user.emailVerified ? (
            <Text style={styles.text}>You email is verified :)</Text>
          ) : (
            <Text style={styles.text}>Your email is not verified yet :(</Text>
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
