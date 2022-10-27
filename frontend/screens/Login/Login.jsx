import { StyleSheet, Text,Image, View, TextInput, Dimensions, Alert, Modal, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import axios from 'axios';
//Componentes Generales
import ButtonInputNormal from '../../components/ButtonInputNormal.jsx';
import BotonLogin from '../../components/BotonGradiente.jsx';
import ButtonListSelect from '../../components/ButtonListSelect.jsx';
//Recursos visuales
import Logo from '../../assets/logo_clinica.png';
//Iconos
import { AntDesign } from '@expo/vector-icons';
//Haciendo uso de Context
import { AuthContextL } from '../../AuthContext.jsx';

import { MaterialIcons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window'); 


export default function Login({navigation}) {
  const [name, setName] = useState('kevin@gmail.com');
  const [password, setPassword] = useState('qwertyuiopAsd1');
  const [rolId, setRolId] = useState(0);
  const [rolValue, setRolValue] = useState('');
  
  const roles_id = ["Paciente", "Especialista"];
  
  const {login, modal, setModal} = useContext(AuthContextL);

  function SvgTop(){
    return(
      <Svg
      width={500}
      height={280}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      >
            <Path
            d="M237.716 240.876C131.16 174.762 30.987 248.673 0 237.865V0h500v237.865c-43.161-9.573-113 95.635-262.284 3.011Z"
            fill="url(#a)"
            />
        <Defs>
            <LinearGradient
              id="a"
              x1={0}
              y1={0}
              x2={-10.736}
              y2={334.072}
              gradientUnits="userSpaceOnUse">

              <Stop stopColor="#35A6EF" />
              <Stop offset={1} stopColor="#E6F2FF" />

            </LinearGradient>
        </Defs>
      </Svg>
    );
  }

  return (
    <View style={styles.Maincontainer}>
      <View style={styles.containerSVG}>
        {<SvgTop/>}
      </View>
      
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.titulo}>Bienvenido</Text>
        <Text style={styles.subtitulo}>Ingrese su información a continuación</Text>
{/* Modal de usuario no logeado */}
<Modal
  animationType="slide"
  transparent={true}
  visible={modal}
  onRequestClose={() => {
    Alert.alert("Saldrá de la aplicación");
    setModal(!modal);
  }}>
    <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <View style={styles.conternView}>
        <AntDesign name="closecircle" size={40} color="#FA7070" />
        <Text style={styles.subtituloModal}>Usuario incorrecto</Text>
        <TouchableOpacity style={styles.botonModal} onPress={() => setModal(!modal)}>
          <Text style={styles.subtituloBotonModal}>Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
</Modal>

        <ButtonListSelect  array={roles_id} setValueInput={setRolValue} setIndexInput={setRolId} backgroundColor={'#fff'} anchoInput={300} padding={8} Logo={MaterialIcons} nameLogo={'people-outline'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} marginLeft={-5} defaultButtonText={'Tipo de usuario'} colorText={'#6c757d'} fontSize={15} />

        <ButtonInputNormal valueInput={name} setValueInput={(text) => setName(text)} placeholder={'Correo'} backgroundColor={'#fff'} anchoInput={300} padding={10} Logo={MaterialIcons} nameLogo={'featured-play-list'} sizeLogo={25} marginBottomInput={15} colorLogo={'#6c757d'} keyboardType={'email-address'} secureTextEntry={false} />
        
        <ButtonInputNormal valueInput={password} setValueInput={(text) => setPassword(text)} placeholder={'Contraseña'} backgroundColor={'#fff'} anchoInput={300} padding={10} Logo={MaterialIcons} nameLogo={'admin-panel-settings'} sizeLogo={25} marginBottomInput={0} colorLogo={'#6c757d'} keyboardType={'default'} secureTextEntry={true} />
        
        <TouchableOpacity onPress={()=>{navigation.navigate('ResetPassword');}}>
        <Text style={styles.textoSecundario}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <BotonLogin text={'Ingresar'} pressButton={() => {login(name, password, rolId)}} />
        
        <TouchableOpacity onPress={()=>{navigation.navigate('Register');}}>
        <Text style={styles.textoSecundario}>Crear una cuenta</Text>
        </TouchableOpacity>

        <StatusBar style="light" />
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  Maincontainer: 
  {
    backgroundColor: '#f1f1f1',
    flex: 1
  },
  containerSVG:
  {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: -100,
    marginTop: -100
  },
  container:
  {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulo:
  {
    fontSize: 55,
    color: '#34434d',
    fontWeight: 'bold',
  },
  subtitulo:
  {
    fontSize: 18,
    color: '#adb5bd',
    marginBottom: 20
  },
  textoSecundario:
  {
    marginTop: 15,
    color: '#6c757d'
  },
  logo:
  {
    width: 210,
    height: 210,
    resizeMode: 'contain',
    marginBottom: -10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#3c4048d9'
    /*   marginBottom: 350 */
  },
  modalView:{
    height: 270,
    width: 320,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: 'space-around',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  subtituloModal:
  {
    fontSize: 23,
    color: '#adb5bd',
    marginTop: 10
  },
  subtituloBotonModal:
  {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center'
  },
  botonModal:
  {
    backgroundColor: '#47B5FF',
    color: '#fff',
    padding: 15,
    width: 250, 
    justifyContent: 'center',
    borderRadius: 5 ,
    marginTop: 20
  },
  conternView: {
    height: 200,
    width: 260,
    justifyContent: "center",
    alignItems: "center",
  }
});
