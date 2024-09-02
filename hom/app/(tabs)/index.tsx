import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, useColorScheme, Image, Pressable } from 'react-native';
import { PoppinsBoldText, PoppinsText } from '@/components/StyledText';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabOneScreen() {
  const [userName, setUserName] = useState('');
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          setUserName(`${userInfo.prenom}`);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur:", error);
      }
    };

    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/header.png')}
        style={styles.backgroundImage}
      >
      </ImageBackground>


      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <PoppinsText style={styles.headerText}>Bienvenue</PoppinsText>
          <PoppinsBoldText style={styles.headerTitle}>Ma Maison</PoppinsBoldText>

          <Link href="/profil" asChild>
            <Pressable style={styles.profileButton}>
              <Image
                source={require('@/assets/images/profil.png')}
                style={styles.profileIcon}
              />
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.profilesection}>
        <PoppinsText style={styles.profilesectionText}>Profil</PoppinsText>
        <Link href="/profil" asChild>
            <Pressable style={styles.profilesectionButton}>
              <View style={styles.profilesectionButtonContentIcon}>
                <MaterialCommunityIcons name="home-automation" size={30} color="white" />
              </View>
              <PoppinsBoldText style={styles.profilesectionButtonContentTItle}>
                Maison de {userName || 'Utilisateur'}
              </PoppinsBoldText>
              <PoppinsText style={styles.profilesectionButtonContentText}>Modifier le profil et les appareils</PoppinsText>
              <PoppinsText style={styles.profilesectionButtonContentArrow}>></PoppinsText>

            </Pressable>
        </Link>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // Supprimez justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
  },
  header: {
    width: '100%',
    height: 140,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    backgroundColor: 'transparent',
    left: 0,
  },
  headerContainer: {
    position: 'relative',
    height: 140,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    marginLeft: 20,
    marginTop: 50,
    color: '#868686',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  profileButton: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#868686',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
    borderRadius: 100,
  },
  profileIcon: {
    width: '70%',
    height: '70%',
  },


  profilesection: {
    position: 'relative',
    width: '100%',
    height: 300,
    display: 'flex',
    backgroundColor: 'transparent',
    marginTop: 140, // Ajoutez cette ligne pour coller la section au header
    // Supprimez alignItems: 'center',
  },

  profilesectionText: {
    fontSize: 12,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    marginLeft: 20,
    marginTop: 10,
    color: '#868686',
    alignSelf: 'flex-start', // Ajoutez cette ligne
  },
  profilesectionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)', // Remplace backgroundColor et backgroundOpacity
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Ajoutez cette ligne
    paddingLeft: 100, // Ajoutez cette ligne
    width: '90%',
    height: 90,
    borderRadius: 10,
    alignSelf: 'center', // Ajoutez cette ligne
    marginTop: 5, // Ajoutez cette ligne pour l'espacement
  },
  profilesectionButtonContentIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Remplace backgroundColor et backgroundOpacity
    borderRadius: 100,
    alignSelf: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    marginLeft: 20,
  },
  profilesectionButtonContentTItle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'flex-start', // Ajoutez cette ligne
  },
  profilesectionButtonContentText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#868686',
    alignSelf: 'flex-start', // Ajoutez cette ligne
  },
  profilesectionButtonContentArrow: {
    fontSize: 25,
    fontWeight: 'normal',
    color: '#868686',
    position: 'absolute',
    right: 20,
  },
});
