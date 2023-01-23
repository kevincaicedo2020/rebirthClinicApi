import { View, Text, Alert } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { URL_API } from "@env";

export const AuthContextL = createContext();

export default function AuthContext({ children }) { 
  const [isloading, setIsloading] = useState(false);
  const [modal, setModal] = useState(false);
  const [usertoken, setUsertoken] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const login = async (name, password, rolId) => {
    setIsloading(true);
    fetch(`${URL_API}/api/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: name,
        password: password,
        rol_id: rolId
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

        let userJson = json;
        if (userJson.status) {
          setModal(false);
          setUsertoken(userJson.access_token);
          setUserInfo(userJson.user);
          SecureStore.setItemAsync('userToken', userJson.access_token);
          SecureStore.setItemAsync('userInfo', JSON.stringify(userJson.user));
        } else {
          /* setModal(true); */
          setUsertoken(null);
          setUserInfo({});
        }
        setIsloading(false);
      })
      .catch((error) => console.error(error));
  }

  const logout = async () => {
    setIsloading(true);
    setModal(false);
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userInfo');
    setUsertoken(null);
    setUserInfo({});
    fetch(`${URL_API}/api/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usertoken}`
      }
    });
    /*         .then((response) => response.json())
            .then((json) => 
            {
              console.log(json);
            })
            .catch((error) => console.error(error)); */
    setIsloading(false);
  }

  const isLoggedIn = async () => {
    try {
      setIsloading(true);
      setModal(false);
      let userInfo = await SecureStore.getItemAsync('userInfo');
      let token = await SecureStore.getItemAsync('userToken');
      if (token !== null) {
        setUsertoken(token);
        userInfo = JSON.parse(userInfo);
        setUserInfo(userInfo);
      } else {
        setUsertoken(null);
        setUserInfo({});
      }
      setIsloading(false);
    } catch (error) {
      console.log(`Hay un error ${error}`);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, [])

  return (
    <AuthContextL.Provider value={{ login, logout, isloading, usertoken, setUserInfo, userInfo, modal, setModal }}>
      {children}
    </AuthContextL.Provider >
  )
}

