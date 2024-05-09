import {Pressable, View} from 'react-native';
import {styles} from "../../style/styles";
import {Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";
import {getAuth} from "firebase/auth";
import {useEffect, useState} from "react";
import {router} from "expo-router";

const auth = getAuth();

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignout = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
      router.replace('/signin');
    }).catch((error) => {
      console.error(error);
    });
  };



  return (
    <View style={styles.navbar}>
      <Link href="/"><Ionicons name="planet-outline" size={24} color="#e5e0e0" style={styles.icon}/></Link>
      {user ? (
        <View style={styles.links}>
          <Link href="/profile" style={styles.link}>Profile</Link>
          <Pressable onPress={handleSignout} style={styles.link}>Logout</Pressable>
        </View>
      ) :
        <View style={styles.links}>
          <Link href="/signin" style={styles.link}>Login</Link>
          <Link href="/signup" style={styles.link}>Register</Link>
        </View>
      }
    </View>
  );
}

export default Header;
