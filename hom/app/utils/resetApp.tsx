import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export async function resetApp() {
  try {
    // Supprimer la clé 'hasLaunched' de AsyncStorage
    await AsyncStorage.removeItem('hasLaunched');
    
    // Supprimer les informations utilisateur de AsyncStorage
    await AsyncStorage.removeItem('userInfo');
    
    // Supprimer le fichier userInfo.json s'il existe
    const filePath = `${FileSystem.documentDirectory}userInfo.json`;
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(filePath);
    }
    
    console.log("Application réinitialisée avec succès");
  } catch (error) {
    console.error("Erreur lors de la réinitialisation de l'application:", error);
  }
}