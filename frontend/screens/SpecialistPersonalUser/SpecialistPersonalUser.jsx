import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContextL } from '../../AuthContext';
import * as ImagePicker from 'expo-image-picker';

import { URL_API } from "@env";

import BotonGradiente from "../../components/BotonGradiente";
 
export default function SpecialistPersonalUser({navigation}) {  
  const [pathImage, setPathImage] = useState('');
  const {usertoken, userInfo, logout} = useContext(AuthContextL);

  const updateImage = (imageurl) => {

    let formdata = new FormData();
    /* formdata.append('image', imageurl); */
    formdata.append('image', {
      uri: imageurl,
      type: "image/jpeg",
      name: "photo.jpg"});
    
    fetch(`${URL_API}/api/imageStorePatient`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${usertoken}`,
        "otherHeader": "foo"
      },
      body: formdata
    })
    .then((response)=> response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((error) => console.error(error));
  }

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      updateImage(result.uri);
      
      /* setPathImage(formdata); */
    }
  }

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View style={{height: '50%', width: '100%'}}>
        <LinearGradient
          colors={['#6ff7e8', '#1f7ea1']}
          style={{width: '100%', height: '100%'}}>
        </LinearGradient>
      </View>

      <View style={styles.configUser}>
        <View style={{position: 'relative', width: '100%', height: '100%', alignItems: 'center',}}>
          
        <TouchableOpacity style={{position: 'absolute', top: 30, left: 35}} onPress={()=>{navigation.navigate('SpecialistUserConfig')}}>
          <MaterialIcons name="app-registration"  size={35} color="#1985a1" />
        </TouchableOpacity>
          
          <TouchableOpacity style={{position: 'absolute', top: -50, backgroundColor: '#f8f9fa', borderRadius: 100, padding: 8}} /* onPress={uploadImage} */>
          <View style={styles.conternCard}>
            {pathImage==''? <MaterialIcons name="account-circle" size={100} color="#219ebc" /> : <Image style={{width: 110, height: 110, borderRadius: 100}} source={{uri: pathImage}} />}
            {/* <MaterialIcons name="image" style={{position: 'absolute', bottom: 0, right: 0}} size={25} color="#1985a1" /> */}
          </View>
          </TouchableOpacity>

          <View style={{ marginTop: 80, flex: 1, alignItems: 'center'}}>
            <Text style={[styles.subtituloModal, {color: '#6c757d', fontSize: 20}]}>{userInfo.name} {userInfo.surname}</Text>
            <Text style={[styles.subtituloModal, {marginTop: 5}]}>{userInfo.email}</Text>

              <BotonGradiente text={'Cerrar Sesión'} pressButton={()=>{logout()}} />

          </View>

        </View>
      </View>

      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  flexDirectionRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  configUser:{
    backgroundColor: '#f8f9fa',
    position: 'absolute',
    width: '100%',
    height: '80%',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  conternCard: {
    position: 'relative'
  },
  subtituloModal:
  {
    fontSize: 18,
    color: '#adb5bd',
    textAlign: 'left'
  },
  agendaCalendar:{
    width: '100%',
    marginTop: 5,
    borderTopWidth: 0.5,
    borderColor: '#9caea9',
    paddingTop: 10
  },
  agendaCalendarList:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    marginBottom: 20
  }
})