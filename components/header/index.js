import '../../firebase/firebaseConfig';
import {Pressable, Text, View} from 'react-native';
import {styles} from "../../style/styles";
import {Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";
import {getAuth} from "firebase/auth";
import {router} from "expo-router";
import {useAuth} from "../../app/contexts/authContext";

const auth = getAuth();

const Header = () => {
  const { user } = useAuth();

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
          <Pressable onPress={handleSignout}>
            <Text style={styles.link}>Logout</Text>
          </Pressable>
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
