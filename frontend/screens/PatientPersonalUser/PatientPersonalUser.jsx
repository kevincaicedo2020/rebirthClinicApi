import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContextL } from '../../AuthContext';
import * as ImagePicker from 'expo-image-picker';

import { URL_API } from "@env";

import BotonGradiente from "../../components/BotonGradiente";


export default function PatientPersonalUser({ navigation }) {
  const [agenda, setAgenda] = useState([]);
  const [pathImage, setPathImage] = useState('');
  const { usertoken, userInfo, logout } = useContext(AuthContextL);

  const patientAgendalist = () => {
    fetch(`${URL_API}/api/listAgendaDone`, {
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
      .then((response) => response.json())
      .then((json) => {
        setAgenda(json.patientMessageSpecialist);
      })
      .catch((error) => console.error(error));
  }

  const updateImage = (imageurl) => {
    let fileName = imageurl.split('/').pop();

    let formdata = new FormData();
    /* formdata.append('image', imageurl); */
    formdata.append('photo', {
      uri: imageurl,
      type: "image/jpeg",
      name: fileName
    });
    fetch(`${URL_API}/api/imageStorePatient`, {
      method: 'POST',
      headers: {
        /* Accept: 'application/json', */
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${usertoken}`,
        "otherHeader": "foo"
      },
      body: formdata
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((error) => console.error(error));
  }

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.agendaCalendarList, styles.flexDirectionRow]}>
        <MaterialIcons style={{ marginRight: 10 }} name="date-range" size={20} color="black" />
        <Text style={{ fontSize: 15 }}>{item.medicalAppointment}</Text>
        <MaterialIcons style={{ marginRight: 10, marginLeft: 15 }} name="access-time" size={20} color="black" />
        <Text style={{ fontSize: 15 }}>{item.hour}</Text>
        <MaterialIcons style={{ marginRight: 10, marginLeft: 15 }} name="medical-services" size={20} color="black" />
        <Text style={{ fontSize: 15 }}>{item.name}</Text>
      </View>
    )
  }

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setPathImage(result.uri);
      updateImage(result.uri);
      console.log(result.uri);
    }
  }

  useEffect(() => {
    patientAgendalist();
  }, []);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={{ height: '50%', width: '100%' }}>
        <LinearGradient
          colors={['#6ff7e8', '#1f7ea1']}
          style={{ width: '100%', height: '100%' }}>
        </LinearGradient>
      </View>

      <View style={styles.configUser}>
        <View style={{ position: 'relative', width: '100%', height: '100%', alignItems: 'center', }}>

          <TouchableOpacity style={{ position: 'absolute', top: 30, left: 35 }} onPress={() => { navigation.navigate('PatientUserConfig') }}>
            <MaterialIcons name="app-registration" size={35} color="#1985a1" />
          </TouchableOpacity>

          <TouchableOpacity style={{ position: 'absolute', top: -50, backgroundColor: '#f8f9fa', borderRadius: 100, padding: 8 }} onPress={uploadImage}>
            <View style={styles.conternCard}>
              {pathImage == '' ? <MaterialIcons name="account-circle" size={100} color="#219ebc" /> : <Image style={{ width: 110, height: 110, borderRadius: 100 }} source={{ uri: pathImage }} />}
              {/* <MaterialIcons name="image" style={{position: 'absolute', bottom: 0, right: 0}} size={25} color="#1985a1" /> */}
            </View>
          </TouchableOpacity>

          <View style={{ marginTop: 80, flex: 1, alignItems: 'center' }}>
            <Text style={[styles.subtituloModal, { color: '#6c757d', fontSize: 20 }]}>{userInfo.name} {userInfo.surname}</Text>
            <Text style={[styles.subtituloModal, { marginTop: 5 }]}>{userInfo.email}</Text>

            <View style={[{ display: 'flex', marginTop: 5, width: 400, alignItems: 'center', justifyContent: 'center' }]}>
              <View style={[styles.flexDirectionRow]}>
                <View style={[styles.flexDirectionRow, { padding: 7 }]}>
                  <MaterialIcons style={{ marginRight: 5 }} name="people-outline" size={20} color="#6c757d" />
                  <Text style={{ color: '#adb5bd', fontSize: 18 }}>{userInfo.gender}</Text>
                </View>
                <View style={[styles.flexDirectionRow, { padding: 7 }]}>
                  <MaterialIcons style={{ marginRight: 5 }} name="badge" size={20} color="#6c757d" />
                  <Text style={{ color: '#adb5bd', fontSize: 18 }}>{userInfo.age}</Text>
                </View>
              </View>
              <View style={[styles.flexDirectionRow]}>
                <View style={[styles.flexDirectionRow, { padding: 7 }]}>
                  <MaterialIcons style={{ marginRight: 5 }} name="phone-iphone" size={20} color="#6c757d" />
                  <Text style={{ color: '#adb5bd', fontSize: 18 }}>{userInfo.phone}</Text>
                </View>
                <View style={[styles.flexDirectionRow, { padding: 7 }]}>
                  <MaterialIcons style={{ marginRight: 5 }} name="work" size={20} color="#6c757d" />
                  <Text style={{ color: '#adb5bd', fontSize: 18 }}>{userInfo.occupation}</Text>
                </View>
              </View>
            </View>

            <View style={styles.agendaCalendar}>
              <Text style={{ textAlign: 'center', fontSize: 18, color: '#0096c7', fontWeight: '900', marginBottom: 10 }}>Agendamiento de citas médicaas</Text>

              <FlatList
                data={agenda}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                style={{ height: 250 }}
              />

            </View>

            <BotonGradiente text={'Cerrar Sesión'} pressButton={() => { logout() }} />

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
  configUser: {
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
  agendaCalendar: {
    width: '100%',
    marginTop: 5,
    borderTopWidth: 0.5,
    borderColor: '#9caea9',
    paddingTop: 10
  },
  agendaCalendarList: {
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