import React, { useEffect, useContext, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { FontAwesome } from '@expo/vector-icons';
import { URL_API } from "@env";
//Haciendo uso de Context
import { AuthContextL } from '../../AuthContext';

export default function PatientMessage() {            

  const [verifyAmountMessageSpecialist, setVerifyAmountMessageSpecialist] = useState({});
  const {usertoken, userInfo} = useContext(AuthContextL);

  const patientSpecialistMessage = () => {
    fetch(`${URL_API}/api/listMessageAgendaPatientUser`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usertoken}`
      },
      body: JSON.stringify({
        id: userInfo.id
      })
    })
    .then((response)=> response.json())
    .then((json) => {
      
      let json2 = json.patientMessageSpecialist;
      const newJson = {};
      Object.keys(json2).forEach((valor)=>{
        newJson[valor] = json2[valor].user_id;
      });
      setVerifyAmountMessageSpecialist(newJson);
    })
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    patientSpecialistMessage();
  }, []);

  return (
    <View>
      {/*
        onPress={()=>{Linking.openURL('https://wa.me/593989962188')}}
      /> */}
      {
        verifyAmountMessageSpecialist[0]===1 && verifyAmountMessageSpecialist[1]===2? 
        <>
          <TouchableOpacity style={{width: '100%', display: 'flex', alignItems: 'center', marginTop: 10}} onPress={()=>{Linking.openURL('https://wa.me/593995035371')}}>
            <View style={styles.conternCard}>
            <View style={styles.iconWassatp}>
                  <Image
                  style={styles.imgPerfil}
                  source={require('../../assets/michael.png')}
                  />
                  <FontAwesome name="whatsapp" style={{position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: 100, padding: 3}} size={30} color="#25D366" />
                </View>
                <View style={styles.conternCardText}>
                    <Text style={[styles.subtituloModal, {color: '#6c757d', fontSize: 18}]}>Dr. Michael Quisilema</Text>
                    <Text style={styles.subtituloModal}>Cirugía Plástica Facial</Text>
                    <Text style={styles.subtituloModal}>Cirujano Máxilo Facial</Text>
                </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '100%', display: 'flex', alignItems: 'center', marginTop: 10}} onPress={()=>{Linking.openURL('https://wa.me/593984517461')}}>
                    <View style={styles.conternCard}>
                        <View style={styles.iconWassatp}>
                          <Image
                          style={styles.imgPerfil}
                          source={require('../../assets/jonathan.png')}
                          />
                          <FontAwesome name="whatsapp" style={{position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: 100, padding: 3}} size={30} color="#25D366" />
                        </View>
                        <View style={styles.conternCardText}>
                            <Text style={[styles.subtituloModal, {color: '#6c757d', fontSize: 18}]}>Dr. Jonathan Quisilema</Text>
                            <Text style={styles.subtituloModal}>Cirugía Plástica Facial</Text>
                            <Text style={styles.subtituloModal}>Otorrinolaringología</Text>
                        </View>
                    </View>
          </TouchableOpacity>
        </> 
        : 
        verifyAmountMessageSpecialist[0]===1?
        <TouchableOpacity style={{width: '100%', display: 'flex', alignItems: 'center', marginTop: 10}} onPress={()=>{Linking.openURL('https://wa.me/593984517461')}}>
            <View style={styles.conternCard}>
                <View style={styles.iconWassatp}>
                  <Image
                  style={styles.imgPerfil}
                  source={require('../../assets/jonathan.png')}
                  />
                  <FontAwesome name="whatsapp" style={{position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: 100, padding: 3}} size={30} color="#25D366" />
                </View>
                <View style={styles.conternCardText}>
                    <Text style={[styles.subtituloModal, {color: '#6c757d', fontSize: 18}]}>Dr. Jonathan Quisilema</Text>
                    <Text style={styles.subtituloModal}>Cirugía Plástica Facial</Text>
                    <Text style={styles.subtituloModal}>Otorrinolaringología</Text>
                </View>
            </View>
        </TouchableOpacity>
        : 
        verifyAmountMessageSpecialist[0]===2?
        <TouchableOpacity style={{width: '100%', display: 'flex', alignItems: 'center', marginTop: 10}} onPress={()=>{Linking.openURL('https://wa.me/593995035371')}}>
            <View style={styles.conternCard}>
            <View style={styles.iconWassatp}>
                  <Image
                  style={styles.imgPerfil}
                  source={require('../../assets/michael.png')}
                  />
                  <FontAwesome name="whatsapp" style={{position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: 100, padding: 3}} size={30} color="#25D366" />
                </View>
                <View style={styles.conternCardText}>
                    <Text style={[styles.subtituloModal, {color: '#6c757d', fontSize: 18}]}>Dr. Michael Quisilema</Text>
                    <Text style={styles.subtituloModal}>Cirugía Plástica Facial</Text>
                    <Text style={styles.subtituloModal}>Cirujano Máxilo Facial</Text>
                </View>
            </View>
        </TouchableOpacity>
        :
        ''
      }

      <StatusBar style="dark" />
    </View>
  )
}

const styles = StyleSheet.create({
  conternCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#dee2e6'
  },
  conternCardText: {
    backgroundColor: '#fff',
    padding: 10,
    width: '70%',
    borderRadius: 5
  },
  imgPerfil: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 100
  },
  subtituloModal:
  {
    fontSize: 16,
    color: '#adb5bd',
    textAlign: 'left'
  },
  iconWassatp:{
    position: 'relative'
  }
})