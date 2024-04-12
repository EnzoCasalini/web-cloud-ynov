import {View} from 'react-native';
import {styles} from "../../style/styles";
import {Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";

const Header = () => {
  return (
    <View style={styles.navbar}>
      <Ionicons name="planet-outline" size={24} color="#e5e0e0" style={styles.icon}/>
      <View style={styles.links}>
        <Link href="/signin" style={styles.link}>Login</Link>
        <Link href="/signup" style={styles.link}>Register</Link>
        <Link href="/profile" style={styles.link}>Profile</Link>
      </View>
    </View>
  );
}

export default Header;
