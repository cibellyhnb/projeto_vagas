import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encontre as melhores oportunidades de emprego!</Text>
      <View style={styles.buttonContainer}>
        <Link style={styles.button} href="./signIn">Criar Conta</Link>
        <Link style={styles.button} href="./login">Login</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: '#000', 
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 14,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#a62c2a', 
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
