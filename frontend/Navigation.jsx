import React, { useContext } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';

//Los distintos tipos de pantallas
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Pantalla de carga
import LoadingScreen from './components/LoadingScreen';

//Pantallas importadas
//Pantallas normales
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import Resetpassword from './screens/ResetPassword/Resetpassword';
//Pantallas de Paciente
import PatientIndications from './screens/PatientIndications/PatientIndications';
import PatientCalendarAgenda from './screens/PatientCalendar/PatientCalendarAgenda';
import PatientMessage from './screens/PatientMessage/PatientMessage';
import PatientPersonalUser from './screens/PatientPersonalUser/PatientPersonalUser';
import PatientUserConfig from './screens/PatientPersonalUser/PatientUserConfig';
//Pantallas de Especialista
import SpecialistCalendar from "./screens/SpecialistCalendar/SpecialistCalendar";
import SpecialistPersonalUser from "./screens/SpecialistPersonalUser/SpecialistPersonalUser";
import SpecialistUserConfig from "./screens/SpecialistPersonalUser/SpecialistUserConfig";
//Iconos importados de MaterialIcons
import { MaterialIcons } from '@expo/vector-icons';
//Haciendo uso de Context
import { AuthContextL } from './AuthContext';

//LLamando mis dos tipos de pantallas en variables
const TabBar = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//PANTALLAS DEL PACIENTE
function ScreenPatient() {
  const { logout } = useContext(AuthContextL);
  return (
    <TabBar.Navigator initialRouteName='Indications'
      screenOptions={{
        tabBarActiveTintColor: '#2FA4FF', tabBarInactiveTintColor: '#8BBCCC', headerTitleAlign: 'center',
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => { logout() }}>
              <MaterialIcons name="logout" style={styles.logout} size={24} color="black" />
            </TouchableOpacity>
          )
        }
      }}>

      <TabBar.Screen name="Indications" component={PatientIndications}
        options={{
          tabBarLabel: 'Videos',
          title: 'Indicaciones Médicas',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="view-list" size={24} color={color} />),
          /* tabBarBadge: 4, */
          /* headerShown:false */
        }} />

      <TabBar.Screen name="CalendarAgenda" component={PatientCalendarAgenda}
        options={{
          tabBarLabel: 'Calendario',
          title: 'Agendar cita',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="calendar-today" size={24} color={color} />),
          /* headerShown:false */
        }} />

      <TabBar.Screen name="Message" component={PatientMessage}
        options={{
          tabBarLabel: 'Mensajes',
          title: 'Mensajería',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="messenger-outline" size={24} color={color} />),
          /* tabBarBadge: 20, */
          /* headerShown:false */
        }} />

      <TabBar.Screen name="PersonalUser" component={PatientStack}
        options={{
          tabBarLabel: 'Configuración',
          title: 'Usuario',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="people-alt" size={24} color={color} />),
          headerShown: false
        }} />

    </TabBar.Navigator>
  )
}
function PatientStack() {
  return (
    <Stack.Navigator initialRouteName='PersonalUserPatien' screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name='PersonalUserPatien' component={PatientPersonalUser} options={{ headerShown: false }} />
      <Stack.Screen name='PatientUserConfig' component={PatientUserConfig} options={{ title: 'Editar Usuario', animation: 'slide_from_right' }} />
    </Stack.Navigator>
  )
}
//PANTALLAS DEL ESEPECIALISTA
function ScreenSpecialist() {
  const { logout } = useContext(AuthContextL);
  return (
    <TabBar.Navigator initialRouteName='Calendar'
      screenOptions={{
        tabBarActiveTintColor: '#2FA4FF', tabBarInactiveTintColor: '#8BBCCC', headerTitleAlign: 'center',
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => { logout() }}>
              <MaterialIcons name="logout" style={styles.logout} size={24} color="black" />
            </TouchableOpacity>
          )
        }
      }}>

      <TabBar.Screen name="Calendar" component={SpecialistCalendar}
        options={{
          tabBarLabel: 'Calendar',
          title: 'Listado de citas médicas',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="calendar-today" size={24} color={color} />),
          /* tabBarBadge: 4, */
          /* headerShown:false */
        }} />

      <TabBar.Screen name="PersonalUser" component={SpecialistStack}
        options={{
          tabBarLabel: 'Configuración',
          title: 'Usuario',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="people-alt" size={24} color={color} />),
          headerShown: false
        }} />

    </TabBar.Navigator>
  )
}
function SpecialistStack() {
  return (
    <Stack.Navigator initialRouteName='PersonalUserSpecialist' screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name='PersonalUserSpecialist' component={SpecialistPersonalUser} options={{ headerShown: false }} />
      <Stack.Screen name='SpecialistUserConfig' component={SpecialistUserConfig} options={{ title: 'Editar Usuario', animation: 'slide_from_right' }} />
    </Stack.Navigator>
  )
}
//PANTALLA DE LOGIN, REGISTRO Y REESTABLECER CONTRASEÑAS
function Authenticate() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false, animationTypeForReplace: 'pop' }} />
      <Stack.Screen name='Register' component={Register} options={{ title: 'Registro', animation: 'slide_from_left' }} />
      <Stack.Screen name='ResetPassword' component={Resetpassword} options={{ title: 'Restablecer contraseña', animation: 'slide_from_right' }} />
    </Stack.Navigator>
  )
}

export default function Navigation() {
  const { isloading, usertoken, userInfo } = useContext(AuthContextL);
  return (
    <>
      {isloading ? (<LoadingScreen />) : (usertoken !== null) ? (userInfo.rol_id == 1 ? <ScreenPatient /> : <ScreenSpecialist />) : (<Authenticate />)}
    </>
  )
}

const styles = StyleSheet.create({
  logout:
  {
    marginRight: 20
  }
});
