import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

export default function LoadingScreen() {//Pantalla de carga
  return (
    <View style={styles.centerScreen}>
        <ActivityIndicator size={'large'} color="#00b4d8" />
      </View>
  )
}

const styles = StyleSheet.create({
    centerScreen:
    {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'
    }
})