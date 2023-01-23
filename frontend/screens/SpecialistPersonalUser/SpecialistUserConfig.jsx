import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Alert} from 'react-native';
import ButtonInputNormal from '../../components/ButtonInputNormal';

import { MaterialIcons } from '@expo/vector-icons';
//Importacion para Botones
import BotonGradiente from '../../components/BotonGradiente';
import ButtonListSelect from '../../components/ButtonListSelect';

import { URL_API } from "@env";
import { AuthContextL } from '../../AuthContext';

export default function SpecialistUserConfig({navigation}) {   
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');

    const {usertoken, setUserInfo, userInfo} = useContext(AuthContextL);

    const updateRegisterPatient = (idUser, inputName, inputEmail) => {
        fetch(`${URL_API}/api/updateUserSpecialist`, {
              method: 'PUT', 
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
              },
              body: JSON.stringify({
                id : idUser,
                name : inputName,
                email : inputEmail
                })
              })
              .then((response) => response.json())
              .then((json) =>
              {
                if (json.errors) {
                  const erroresMsg = [];
                  for (let errores in json.errors) {
                    erroresMsg.push(json.errors[errores][0]);
                  }
                  erroresMsg.forEach(element => {
                    toString(element)
                  })
                  Alert.alert('Datos incorrectos', erroresMsg.toString().replace(/,/g , '\n'), [
                    { text: 'OK' },
                  ]);
                }
                if (json.status===1) {
                    setUserInfo(json.data);
                    navigation.navigate('PersonalUserSpecialist');
                    Alert.alert(
                        "Usuario Modificado",
                        "El perfil ha sido modificado con éxito",
                        [
                          { text: "OK"}
                        ]
                      )
                }
              })
              .catch((error) => console.error(error));
      }

      useEffect(() => {
        setInputName(userInfo.name);
        setInputEmail(userInfo.email);
      }, []);

  return (
    <View style={styles.viewContainer}>

      <View style={styles.viewCenter}>

        <ButtonInputNormal valueInput={inputName} setValueInput={(text) => setInputName(text)} placeholder={'Nombres'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'person'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'default'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputEmail} setValueInput={(text) => setInputEmail(text)} placeholder={'Correo electrónico'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'email'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'email-address'} secureTextEntry={false} />

        <BotonGradiente text={'Enviar'} pressButton={()=>updateRegisterPatient( userInfo.id, inputName, inputEmail)} />

      </View>

  </View>
  )
}

const styles = StyleSheet.create({
    viewContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
      },
      viewCenter:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical:25,
        borderRadius: 10,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
      }
})