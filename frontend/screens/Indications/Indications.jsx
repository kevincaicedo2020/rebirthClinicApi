import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { AuthContextL } from '../../AuthContext';

export default function Calendar() {
  const {usertoken, userInfo} = useContext(AuthContextL);
  return (
    <View>
      <Text>Indications{usertoken}</Text>
      <Text>sssssssssssssssssssssssssss{userInfo.name}</Text>
      <StatusBar style="dark" />
    </View>
  )
}

const styles = StyleSheet.create({})