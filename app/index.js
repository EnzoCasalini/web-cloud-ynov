import {Text, View} from 'react-native';
import {styles} from "../style/styles";
import {LinearGradient} from "expo-linear-gradient";

export default function App() {
  return (
    <LinearGradient colors={['#2a2a2a', '#7a7a7a']} style={styles.container}>
      <View>
        <Text style={styles.h1}>Welcome to my app !</Text>
      </View>
    </LinearGradient>
  );
}