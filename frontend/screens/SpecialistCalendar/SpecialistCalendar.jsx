import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert, Modal, Image } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';

//Pantalla de carga
import LoadingScreen from '../../components/LoadingScreen';
//Haciendo uso de Context
import { AuthContextL } from '../../AuthContext';
//Importar iconos de MaterialIcons 
import { MaterialIcons } from '@expo/vector-icons';

import { URL_API } from "@env";

const timeToString = (time) => {  
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

export default function SpecialistCalendar() {       
    const [items, setItems] = useState({});
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msgAgenda, setmsgAgenda] = useState('');
    const [infoDayHour, setInfoDayHour] = useState({
        hour : null, 
        day : null,
        id : null
    });
    
    const {usertoken, userInfo} = useContext(AuthContextL);

    LocaleConfig.locales['ec'] = {
        monthNames: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ],
        monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
        today: "Hoy"
      };
    LocaleConfig.defaultLocale = 'ec';

    const patientAgendaList = (itemsformonth) => {
        fetch(`${URL_API}/api/listPatientsAgendaSpecialist`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
            },
            body: JSON.stringify({
                idSpecialist : userInfo.id
            })
        })
        .then((reponse) => reponse.json())
        .then((json) => {

            let JsonAgenda = json.patientAgendaOkList;

            Object.keys(itemsformonth).forEach((valor)=>{
                for (let i = 0; i < JsonAgenda.length; i++) {
                    if (JsonAgenda[i].medicalAppointment === valor) {
                        itemsformonth[valor][JsonAgenda[i].dateIdentifier].name=JsonAgenda[i].name;
                        itemsformonth[valor][JsonAgenda[i].dateIdentifier].surname=JsonAgenda[i].surname;
                        itemsformonth[valor][JsonAgenda[i].dateIdentifier].ci=JsonAgenda[i].ci;
                        itemsformonth[valor][JsonAgenda[i].dateIdentifier].gender=JsonAgenda[i].gender;
                        itemsformonth[valor][JsonAgenda[i].dateIdentifier].age=JsonAgenda[i].age;
                        itemsformonth[valor][JsonAgenda[i].dateIdentifier].phone=JsonAgenda[i].phone;
                        itemsformonth[valor][JsonAgenda[i].dateIdentifier].occupation=JsonAgenda[i].occupation;
                    }
                }
            });

            const newItems2 = {};
            Object.keys(itemsformonth).forEach(key => {
                newItems2[key] = itemsformonth[key];
            });
            setItems(newItems2);
        })
    }

    
    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                
                if (!items[strTime]) {
                    items[strTime] = [];

                    const numeroDiaMartes = new Date(strTime).getDay();
                    const arrayHours = ["10:00-10:30","10:30-11:00","11:00-11:30","11:30-12:00","12:00-12:30","12:30-1:00","14:00-14:30","14:30-15:00","15:00-15:30","15:30-16:00"];
                    if (numeroDiaMartes===1) {
                        for (let j = 0; j <= 9; j++) {
                            items[strTime].push({
                                hours: arrayHours[j],
                                day: strTime,
                                id: j,
                                name: '',
                                surname: '',
                                ci: '',
                                gender: '',
                                age: '',
                                phone: '',
                                occupation: ''
                            });
                        }
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            patientAgendaList(newItems);
        }, 1000);
    }

    const renderItem = (item) => {
        return (
            <View style={styles.listafecha}>
                <Text style={styles.txtHours}>{item.hours}</Text>
                {item.name!=''?
                <>
                <TouchableOpacity style={styles.patientAgendaList}>
                    <View style={[styles.flexDirectionRow, {borderBottomWidth: 1, borderBottomColor: '#C9CBFF'}]}>
                        <View style={[styles.imgPatient, {width: '10%'}]}>
                            <MaterialIcons name="person" size={25} color="#383838" />
                        </View>
                        <View style={{width: '80%', paddingVertical: 5, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10}}>
                            <Text style={[styles.fontWeight700, {color: '#393E46'}]}>{item.name} {item.surname}</Text>
                            <Text style={[styles.fontWeight300, {color: '#393E46'}]}>{item.ci}</Text>
                        </View>
                    </View>
                    <View style={[styles.flexDirectionRow, {justifyContent: 'space-around', paddingTop: 5, width: '100%', flexWrap: 'wrap'}]}>
                        <View style={styles.flexDirectionRow}>
                            <MaterialIcons style={{marginRight: 5}} name="people-outline" size={15} color="#383838" />
                            <Text style={{color: '#393E46', fontSize: 12}}>{item.gender}</Text>
                        </View>
                        <View style={styles.flexDirectionRow}>
                            <MaterialIcons style={{marginRight: 5}} name="badge" size={15} color="#383838" />
                            <Text style={{color: '#393E46', fontSize: 12}}>{item.age}</Text>
                        </View>
                        <View style={styles.flexDirectionRow}>
                            <MaterialIcons style={{marginRight: 5}} name="phone-iphone" size={15} color="#383838" />
                            <Text style={{color: '#393E46', fontSize: 12}}>{item.phone}</Text>
                        </View>
                        <View style={styles.flexDirectionRow}>
                            <MaterialIcons style={{marginRight: 5}} name="work" size={15} color="#383838" />
                            <Text style={{color: '#393E46', fontSize: 12}}>{item.occupation}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                </>
                : ''
                }
                

            </View>
        );
    }

  return (
    <View style={styles.container}>
<Modal
  animationType="slide"
  transparent={true}
  visible={modal}
  onRequestClose={() => {
    Alert.alert("Saldrá de la aplicación");
    setModal(!modal);
  }}>
    <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <View style={styles.conternView}>
        {
        loading ? <LoadingScreen />
        :
        msgAgenda == 'Habilitado' ?
        <>
        <TouchableOpacity style={styles.conternCard} onPress={() => Alert.alert("Confirmar cita médica", '¿Estas seguro que deseas generar una cita médica?', [
        {
            text: 'Cancelar',
            style: 'cancel',
        },
        { text: 'SI', onPress: () =>{insertByDateAndHourAgenda(infoDayHour.day, infoDayHour.hour, infoDayHour.id, userInfo.id, 'Dr. Jonathan'); setModal(false)}},
        ])}>
            <Image
            style={styles.imgPerfil}
            source={require('../../assets/jonathan.png')}
            />
            <View style={styles.conternCardText}>
                <Text style={styles.subtituloModal}>Dr. Jonathan Quisilema</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.conternCard} onPress={() => Alert.alert("Confirmar cita médica", '¿Estas seguro que deseas generar una cita médica?', [
        {
            text: 'Cancelar',
            style: 'cancel',
        },
        { text: 'SI', onPress: () =>{insertByDateAndHourAgenda(infoDayHour.day, infoDayHour.hour, infoDayHour.id, userInfo.id, 'Dr. Michael'); setModal(false)}},
        ])}>
            <Image
            style={styles.imgPerfil}
            source={require('../../assets/michael.png')}
            />
            <View style={styles.conternCardText}>
                <Text style={styles.subtituloModal}>Dr. Michael Quisilema</Text>
            </View>
        </TouchableOpacity>
        </>
        :
        msgAgenda == 'Cupos llenos' ?
        <Text>Cupos llenos</Text>
        :
        msgAgenda == 'jonathan' ?
        <TouchableOpacity style={styles.conternCard} onPress={() => Alert.alert("Confirmar cita médica", '¿Estas seguro que deseas generar una cita médica?', [
        {
            text: 'Cancelar',
            style: 'cancel',
        },
        { text: 'SI', onPress: () =>{insertByDateAndHourAgenda(infoDayHour.day, infoDayHour.hour, infoDayHour.id, userInfo.id, 'Dr. Michael'); setModal(false)}},
        ])}>
            <Image
            style={styles.imgPerfil}
            source={require('../../assets/michael.png')}
            />
            <View style={styles.conternCardText}>
                <Text style={styles.subtituloModal}>Dr. Michael Quisilema</Text>
            </View>
        </TouchableOpacity>
        :
        msgAgenda == 'michael' ?
        <TouchableOpacity style={styles.conternCard} onPress={() => Alert.alert("Confirmar cita médica", '¿Estas seguro que deseas generar una cita médica?', [
        {
            text: 'Cancelar',
            style: 'cancel',
        },
        { text: 'SI', onPress: () =>{insertByDateAndHourAgenda(infoDayHour.day, infoDayHour.hour, infoDayHour.id, userInfo.id, 'Dr. Jonathan'); setModal(false)}},
        ])}>
            <Image
            style={styles.imgPerfil}
            source={require('../../assets/jonathan.png')}
            />
            <View style={styles.conternCardText}>
                <Text style={styles.subtituloModal}>Dr. Jonathan Quisilema</Text>
            </View>
        </TouchableOpacity>
        :
        ''
        }
        
      </View>
      <TouchableOpacity style={styles.botonModal} onPress={() => setModal(!modal)}>
          <Text style={[styles.subtituloModal, {color: '#fff'}]}>Cancelar</Text>
        </TouchableOpacity>
    </View>
    </View>
</Modal>
        <Agenda
        items={items}
        firstDay={1}
        renderEmptyDate={() => {
        return(
            <View style={styles.emptydate}>
            </View>
            );
        }}
        loadItemsForMonth={loadItems}
        refreshing={true}
        showClosingKnob={true}
        renderItem={renderItem}
        />
        <StatusBar />
    </View>
  )
}

const styles = StyleSheet.create({
    emptydate:
    {
        flex: 1,
        backgroundColor: '#D1D9D9',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    container: {
        flex: 1
    },
    flexDirectionRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    listafecha: {
        borderRadius: 5,
        padding: 10,
        paddingVertical: 15,
        marginTop: 17,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    patientAgendaList:{
        paddingVertical: 10,
        borderRadius: 5,
        width: 350,
        minWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#f5f5f7'
    },
    imgPatient:{
        borderRadius: 50,
        backgroundColor: '#D6E4E5',
        padding: 5
    },
    txtHours:{
        fontSize: 20
    },
    fontWeight700:{
        fontWeight: '700'
    },
    fontWeight300:{
        fontWeight: '300'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#3c4048d9'
        /*   marginBottom: 350 */
      },
      modalView:{
        width: '90%',
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: 'space-around',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      botonModal:
      {
        backgroundColor: '#B73E3E',
        padding: 10,
        width: '95%', 
        justifyContent: 'center',
        borderRadius: 5 ,
        marginTop: 20
      },
      subtituloModal:
      {
        fontSize: 15,
        color: '#adb5bd',
        textAlign: 'center'
      },
      conternView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
      },
      conternCard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        borderRadius: 10,
        backgroundColor: '#00ABB3',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      conternCardText: {
        backgroundColor: '#fff',
        padding: 10,
        width: '100%'
      },
      imgPerfil:{
        width: 90,
        height: 90
      }
})