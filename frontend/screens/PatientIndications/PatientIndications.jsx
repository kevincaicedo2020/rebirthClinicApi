import React, { useContext, useState, useRef } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { AuthContextL } from '../../AuthContext';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function PatientIndications() {     
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const {usertoken, userInfo} = useContext(AuthContextL);

  const DATA = [
    {
      urlVideo: 'https://d1u0e8zi4xkjiu.cloudfront.net/cuidado_nariz7.mp4',
    },
    {
      urlVideo: 'https://d1u0e8zi4xkjiu.cloudfront.net/cuidado_nariz2.mp4',
    },
    {
      urlVideo: 'https://d1u0e8zi4xkjiu.cloudfront.net/cuidado_nariz3.mp4',
    },
    {
      urlVideo: 'https://d1u0e8zi4xkjiu.cloudfront.net/cuidado_nariz4.mp4',
    },
    {
      urlVideo: 'https://d1u0e8zi4xkjiu.cloudfront.net/cuidado_nariz5.mp4',
    },
    {
      urlVideo: 'https://d1u0e8zi4xkjiu.cloudfront.net/cuidado_nariz6.mp4',
    },
    {
      urlVideo: 'https://d1u0e8zi4xkjiu.cloudfront.net/cuidado_nariz1.mp4',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => 
            <Video
            ref={video}
            style={styles.video}
            source={{
              uri: item.urlVideo,
            }}
            useNativeControls
            resizeMode="contain"
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />}
        keyExtractor={(item, index) => index}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 400,
    height: 200,
    marginBottom: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})