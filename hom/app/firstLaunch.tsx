import React, { useState } from 'react';
import {TextInput, Button, StyleSheet, Alert, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { PoppinsBoldText, PoppinsText } from '@/components/StyledText';

export default function FirstLaunch() {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!prenom.trim() || !nom.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    const userInfo = { prenom, nom };
    
    try {
      // Enregistrement dans AsyncStorage uniquement
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log("Données enregistrées dans AsyncStorage");

      // Marquer l'application comme lancée
      await AsyncStorage.setItem('hasLaunched', 'true');
      console.log("Application marquée comme lancée");

      // Vérification de l'enregistrement
      const savedAsyncStorage = await AsyncStorage.getItem('userInfo');
      console.log("Contenu de AsyncStorage:", savedAsyncStorage);

      Alert.alert("Succès", "Vos informations ont été enregistrées avec succès");
      router.replace('/(tabs)');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des données:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'enregistrement de vos informations");
    }
  };

  return (
    <View style={styles.container}>
        <ImageBackground
        source={require('@/assets/images/firstLaunchBg.png')}
        style={styles.backgroundImage}
        >
        </ImageBackground>

        <Image
            source={require('@/assets/images/icon.png')}
            style={styles.logo}
        />

        <PoppinsText style={styles.title}>Hom</PoppinsText>
        <PoppinsText style={styles.subtitle}>Une nouvelle façon de contrôler votre maison</PoppinsText>
        <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={prenom}
            onChangeText={setPrenom}
        />
        <TextInput
            style={styles.input}
            placeholder="Nom"
            value={nom}
            onChangeText={setNom}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    height: '100%',
    width: '100%',
  },
  backgroundImage: {    
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 180,
    alignSelf: 'center',
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: 'flex-start',
    width: '80%',
    color: '#868686',
    textTransform: 'uppercase',
  },
  input: {
    alignSelf: 'center',
    width: '90%',
    borderRadius: 10,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white', // Ajout de cette ligne pour changer la couleur du texte en blanc
    paddingLeft: 30,
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    alignSelf: 'center',
    width: 230,
    height: 40,
    backgroundColor: '#FF8E68',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#353535', // Changez cette couleur selon vos préférences
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});