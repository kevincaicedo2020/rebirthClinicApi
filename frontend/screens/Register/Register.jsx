import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonInputNormal from '../../components/ButtonInputNormal';

import { MaterialIcons } from '@expo/vector-icons';
//Importacion para Botones
import BotonGradiente from '../../components/BotonGradiente';
import ButtonListSelect from '../../components/ButtonListSelect';

export default function Register() {
  const [inputCi, setInputCi] = useState(0);
  const [inputName, setInputName] = useState('');
  const [inputSurname, setInputSurname] = useState('');
  const [inputOccupation, setInputOccupation] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputAge, setInputAge] = useState(0);
  const [InputValueGender, setInputValueGender] = useState('');
  const [InputIndexGender, setInputIndexGender] = useState('');
  const [InputPhone, setInputPhone] = useState(0);
  const [InputPassword, setInputPassword] = useState('');
  const [InputRememberPassword, setInputRememberPassword] = useState('');

  const genero = ["Femenino", "Masculino"];

  const sendRegisterPatient = (inputCi, inputName, inputSurname, inputOccupation, inputEmail, inputAge, InputGender, InputPhone, InputPassword, InputRememberPassword) => {
    fetch('https://28cb-157-100-141-246.sa.ngrok.io/api/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ci : inputCi,
            name : inputName,
            surname : inputSurname,
            occupation : inputOccupation,
            email : inputEmail,
            age : inputAge,
            gender : InputGender,
            phone : InputPhone,
            password : InputPassword,
            password_confirmation : InputRememberPassword,
            rol_id : 1
            })
          })
          .then((response) => response.json())
          .then((json) =>
          {
            console.log(json);
          })
          .catch((error) => console.error(error));
  }

  return (
    <View style={styles.viewContainer}>

      <View style={styles.viewCenter}>

        <ButtonInputNormal valueInput={inputCi} setValueInput={(text) => setInputCi(text)} placeholder={'Cédula'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'featured-play-list'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'numeric'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputName} setValueInput={(text) => setInputName(text)} placeholder={'Nombres'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'person'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'default'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputSurname} setValueInput={(text) => setInputSurname(text)} placeholder={'Apellidos'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'supervised-user-circle'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'default'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputOccupation} setValueInput={(text) => setInputOccupation(text)} placeholder={'Ocupación'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'work'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'default'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputEmail} setValueInput={(text) => setInputEmail(text)} placeholder={'Correo electrónico'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'email'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'email-address'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={inputAge} setValueInput={(text) => setInputAge(text)} placeholder={'Edad'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'badge'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'numeric'} secureTextEntry={false} />

        <ButtonListSelect  array={genero} setValueInput={setInputValueGender} setIndexInput={setInputIndexGender} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'people-outline'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} marginLeft={-5} defaultButtonText={'Sexo'} colorText={'#6c757d'} fontSize={15} />

        <ButtonInputNormal valueInput={InputPhone} setValueInput={(text) => setInputPhone(text)} placeholder={'Teléfono'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'phone-iphone'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'numeric'} secureTextEntry={false} />

        <ButtonInputNormal valueInput={InputPassword} setValueInput={(text) => setInputPassword(text)} placeholder={'Contraseña'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'admin-panel-settings'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'default'} secureTextEntry={true} />

        <ButtonInputNormal valueInput={InputRememberPassword} setValueInput={(text) => setInputRememberPassword(text)} placeholder={'Confirmar contraseña'} backgroundColor={'#fff'} anchoInput={325} padding={8} Logo={MaterialIcons} nameLogo={'add-moderator'} sizeLogo={25} marginBottomInput={0} colorLogo={'#6c757d'} keyboardType={'default'} secureTextEntry={true} />

        <BotonGradiente text={'Enviar'} pressButton={()=>sendRegisterPatient(inputCi, inputName, inputSurname, inputOccupation, inputEmail, inputAge, InputValueGender, InputPhone, InputPassword, InputRememberPassword)} />

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