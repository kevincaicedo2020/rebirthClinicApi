import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function BotonGradiente({text, pressButton}) {
  return (
    <TouchableOpacity style={styles.contenedor} onPress={pressButton}>
      <LinearGradient colors={['#00b4d8', '#48cae4' ,'#90e0ef']} start={{x:1, y:0}} end={{x:0, y:1}} style={styles.boton}>
        <Text style={styles.texto}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contenedor:{
    alignItems: 'center',
    marginTop: 10
  },
  boton:{
    height: 50,
    width: 300,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  texto:{
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold'
  }
})