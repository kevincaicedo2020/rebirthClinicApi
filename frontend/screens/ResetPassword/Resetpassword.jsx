import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ButtonInputNormal from '../../components/ButtonInputNormal';

import { MaterialIcons } from '@expo/vector-icons'; 
import BotonGradiente from '../../components/BotonGradiente';

export default function Resetpassword() {
  const [inputEmail, setInputEmail] = useState('');
  
  const senEmailPassword = (sendEmail) => {
    fetch('https://28cb-157-100-141-246.sa.ngrok.io/api/email', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({  
            email : sendEmail
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

      <ButtonInputNormal valueInput={inputEmail} setValueInput={(text) => setInputEmail(text)} placeholder={'Correo electrónico'} backgroundColor={'#fff'} anchoInput={300} padding={10} Logo={MaterialIcons} nameLogo={'email'} sizeLogo={25} marginBottomInput={0} colorLogo={'#6c757d'} keyboardType={'email-address'} secureTextEntry={false} />


      <BotonGradiente text={'Enviar'} pressButton={()=>senEmailPassword(inputEmail)} />

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewCenter:{
    backgroundColor: '#fff',
    padding: 20,
    paddingVertical:30,
    borderRadius: 5
  }
})