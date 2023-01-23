import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

export default function ButtonInputNormal({valueInput, setValueInput ,placeholder, backgroundColor, anchoInput, padding, Logo, nameLogo, sizeLogo, marginBottomInput, colorLogo, keyboardType, secureTextEntry }) {
  return (
        <View style={[styles.viewContainer, {width: anchoInput, padding: padding, marginBottom: marginBottomInput, backgroundColor: backgroundColor}]}>
            <View style={styles.input}>
            <TextInput placeholder={placeholder} onChangeText={setValueInput} value={valueInput} keyboardType={keyboardType} secureTextEntry={secureTextEntry} />
            </View>
            
            <View style={styles.logo}>
            <Logo name={nameLogo} size={sizeLogo} color={colorLogo} />
            </View>
            
        </View>
  ) 
}

const styles = StyleSheet.create({
    viewContainer:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: '#c6c5b9',
        borderWidth: 1
    },
    input:
    {
        width: '90%',
        paddingLeft: 5
    },
    logo:
    {
        width: '10%'
    }
})