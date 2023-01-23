import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import ButtonInputNormal from '../../components/ButtonInputNormal';

import { MaterialIcons } from '@expo/vector-icons';
//Importacion para Botones
import BotonGradiente from '../../components/BotonGradiente';
import ButtonListSelect from '../../components/ButtonListSelect';

import { URL_API } from "@env";
import { AuthContextL } from '../../AuthContext';

export default function PatientUserConfig({ navigation }) {
  const [inputCi, setInputCi] = useState(null);
  const [inputName, setInputName] = useState('');
  const [inputSurname, setInputSurname] = useState('');
  const [inputOccupation, setInputOccupation] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputAge, setInputAge] = useState(0);
  const [InputValueGender, setInputValueGender] = useState('');
  const [InputIndexGender, setInputIndexGender] = useState('');
  const [InputPhone, setInputPhone] = useState(0);

  const { usertoken, setUserInfo, userInfo } = useContext(AuthContextL);

  const genero = ["Femenino", "Masculino"];

  const updateRegisterPatient = (idUser, inputCi, inputName, inputSurname, inputOccupation, inputEmail, inputAge, InputGender, InputPhone) => {
    fetch(`${URL_API}/api/updateUserPatient`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usertoken}`
      },
      body: JSON.stringify({
        id: idUser,
        ci: inputCi,
        name: inputName,
        surname: inputSurname,
        occupation: inputOccupation,
        email: inputEmail,
        age: inputAge,
        gender: InputGender,
        phone: InputPhone
      })
    })
      .then((response) => response.json())
      .then((json) => {
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
        if (json.status === 1) {
          setUserInfo(json.data);
          navigation.navigate('PersonalUserPatien');
          Alert.alert(
            "Usuario Modificado",
            "El perfil ha sido modificado con éxito",
            [
              { text: "OK" }
            ]
          )
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    setInputCi(`${userInfo.ci}`);
    setInputName(userInfo.name);
    setInputSurname(userInfo.surname);
    setInputOccupation(userInfo.occupation);
    setInputEmail(userInfo.email);
    setInputAge(`${userInfo.age}`);
    setInputValueGender(userInfo.gender);
    setInputPhone(userInfo.phone);
  }, []);

  return (
    <View style={styles.viewContainer}>

      <View style={styles.viewCenter}>

        <ButtonInputNormal valueInput={inputCi} setValueInput={(text) => setInputCi(text)} placeholder={'Cédula'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'featured-play-list'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'numeric'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputName} setValueInput={(text) => setInputName(text)} placeholder={'Nombres'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'person'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'default'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputSurname} setValueInput={(text) => setInputSurname(text)} placeholder={'Apellidos'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'supervised-user-circle'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'default'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputOccupation} setValueInput={(text) => setInputOccupation(text)} placeholder={'Ocupación'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'work'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'default'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputEmail} setValueInput={(text) => setInputEmail(text)} placeholder={'Correo electrónico'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'email'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'email-address'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputAge} setValueInput={(text) => setInputAge(text)} placeholder={'Edad'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'badge'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'numeric'} secureTextEntry={false} />

        <ButtonListSelect array={genero} setValueInput={setInputValueGender} setIndexInput={setInputIndexGender} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'people-outline'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} marginLeft={-5} defaultButtonText={'Sexo'} defaulValue={InputValueGender} colorText={'#6c757d'} fontSize={15} />

        <ButtonInputNormal valueInput={InputPhone} setValueInput={(text) => setInputPhone(text)} placeholder={'Teléfono'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'phone-iphone'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'numeric'} secureTextEntry={false} />

        <BotonGradiente text={'Enviar'} pressButton={() => updateRegisterPatient(userInfo.id, inputCi, inputName, inputSurname, inputOccupation, inputEmail, inputAge, InputValueGender, InputPhone)} />

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  viewCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 25,
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