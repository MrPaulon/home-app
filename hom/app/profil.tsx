import { StyleSheet, Button, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { resetApp } from './utils/resetApp';
import { useRouter } from 'expo-router';

export default function ProfilScreen() {
  const router = useRouter();

  const handleResetApp = async () => {
    try {
      await resetApp();
      Alert.alert("Succès", "L'application a été réinitialisée. Veuillez redémarrer l'application.");
      router.replace('/firstLaunch');
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la réinitialisation.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Button title="Réinitialiser l'application" onPress={handleResetApp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
