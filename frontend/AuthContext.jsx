import { View, Text } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContextL = createContext();

export default function AuthContext({children}){
    const [isloading, setIsloading] = useState(false);
    const [modal, setModal] = useState(false);
    const [usertoken, setUsertoken] = useState(null);
    const [userInfo, setUserInfo] = useState({});

    const login = async (name, password, rolId) => {
        setIsloading(true);
        fetch('https://28cb-157-100-141-246.sa.ngrok.io/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email : name,  
            password : password,
            rol_id: rolId
            })
          })
          .then((response) => response.json())
          .then((json) =>
          {
            let userJson = json;
            if (userJson.status){
              setModal(true);
              setUsertoken(userJson.access_token);
              setUserInfo(userJson.user);
              SecureStore.setItemAsync('userToken', userJson.access_token);
              SecureStore.setItemAsync('userInfo', JSON.stringify(userJson.user));
            } else {
              setModal(true);
              setUsertoken(null);
              setUserInfo({});
            }
            setIsloading(false);
          })
          .catch((error) => console.error(error));
          /* axios.post('https://c7b0-157-100-141-246.sa.ngrok.io/api/login', {
            email : "caicedo@hotmail.com",  
            password : "Abw12345678",
          })
          .then(function (response) {
            authenticationLogin(response.data);
          })
          .catch(function (error) {
            console.log(error);
          }); */
    }

    const logout = async () => {
        setIsloading(true);
        setModal(false); 
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userInfo');
        setUsertoken(null);  
        setUserInfo({});  
        fetch('https://28cb-157-100-141-246.sa.ngrok.io/api/logout', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usertoken}`
          }
        })
        .then((response) => response.json())
        .then((json) => 
        {
          console.log(json);
        })
        .catch((error) => console.error(error));

        setIsloading(false);
    }
    
    const isLoggedIn = async () =>{
        try {
            setIsloading(true);
            setModal(false);
            let userInfo = await SecureStore.getItemAsync('userInfo');
            let token = await SecureStore.getItemAsync('userToken');
            if (token!==null) {
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
    <AuthContextL.Provider value={{login, logout, isloading, usertoken, userInfo, modal, setModal}}>
      {children}
    </AuthContextL.Provider >
  )
}

