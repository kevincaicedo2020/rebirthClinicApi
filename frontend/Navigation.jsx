import React, { useContext } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity} from 'react-native';

//Los distintos tipos de pantallas
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Pantallas importadas
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import Indications from './screens/Indications/Indications';
import Calendar from './screens/Calendar/Calendar';
import Message from './screens/Message/Message';
import PersonalUser from './screens/PersonalUser/PersonalUser';
import Resetpassword from './screens/ResetPassword/Resetpassword';
//Iconos importados de MaterialIcons
import { MaterialIcons } from '@expo/vector-icons'; 
//Haciendo uso de Context
import { AuthContextL } from './AuthContext';

//LLamando mis dos tipos de pantallas en variables
const TabBar = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

  function LoadingScreen(){//Pantalla de carga
    return(
      <View style={styles.centerScreen}>
        <ActivityIndicator size={'large'} color="#00b4d8" />
      </View>
    )
  }

  function Administrador() {
    const {logout} = useContext(AuthContextL);
    return(
      <TabBar.Navigator initialRouteName='Indications' 
      screenOptions = {{tabBarActiveTintColor:'#2FA4FF', tabBarInactiveTintColor:'#8BBCCC', headerTitleAlign: 'center' ,
      headerRight: ()=>{
        return(
          <TouchableOpacity onPress={()=>{logout()}}>
            <MaterialIcons name="logout" style={styles.logout} size={24} color="black" />
          </TouchableOpacity>
        )
      } }} >

        <TabBar.Screen name="Indications" component={Indications} 
        options={{
        tabBarLabel:'Videos',
        title:'Cuidados de la salud', 
        tabBarIcon:({color, size})=>(<MaterialIcons name="view-list" size={24} color={color} />),
        tabBarBadge: 4,
        /* headerShown:false */
        }} />

        <TabBar.Screen name="Calendar" component={Calendar} 
        options={{
        tabBarLabel:'Calendario',
        title:'Agendar cita',
        tabBarIcon:({color, size})=>(<MaterialIcons name="calendar-today" size={24} color={color} />),
        /* headerShown:false */
        }} />

        <TabBar.Screen name="Message" component={Message} 
        options={{
          tabBarLabel:'Mensajes',
          title:'Mensajería',
          tabBarIcon:({color, size})=>(<MaterialIcons name="messenger-outline" size={24} color={color} />),
          tabBarBadge: 20,
          /* headerShown:false */
          }} />
        
        <TabBar.Screen name="PersonalUser" component={PersonalUser} 
        options={{
          tabBarLabel:'Configuración',
          title:'Usuario',
          tabBarIcon:({color, size})=>(<MaterialIcons name="people-alt" size={24} color={color} />),
          /* headerShown:false */
          }} />

      </TabBar.Navigator>
    )
  }

  function Authenticate() {
    return(
      <Stack.Navigator  initialRouteName='Login' screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false, animationTypeForReplace: 'pop'}} />
        <Stack.Screen name='Register' component={Register} options={{title: 'Registro',animation: 'slide_from_left' }} />
        <Stack.Screen name='ResetPassword' component={Resetpassword} options={{title: 'Restablecer contraseña',animation: 'slide_from_right'}} />
      </Stack.Navigator>
    )
  }

  export default function Navigation() {
    const {isloading, usertoken} = useContext(AuthContextL);
    return (
      <>
       {isloading? (<LoadingScreen />) : (usertoken !== null) ? (<Administrador />) : (<Authenticate />)}  
      </>
    )
  }

  const styles = StyleSheet.create({
    logout: 
    {
      marginRight: 20
    },
    centerScreen:
    {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'
    }
  });
  