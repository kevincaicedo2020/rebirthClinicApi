import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation.jsx';
import AuthContext from './AuthContext.jsx';

export default function App() {

  return (
    <AuthContext>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthContext>
    
  );
}

  