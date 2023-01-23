import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert, Modal, Image } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';

//Pantalla de carga
import LoadingScreen from '../../components/LoadingScreen';
//Haciendo uso de Context
import { AuthContextL } from '../../AuthContext';

import { URL_API } from "@env";

const timeToString = (time) => {
    /* console.log(time); */
    const date = new Date(time);
    /* console.log(date); */
    return date.toISOString().split('T')[0];
}

export default function PatientCalendarAgenda({ navigation }) { 
    const [items, setItems] = useState({});
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msgAgenda, setmsgAgenda] = useState('');
    const [infoDayHour, setInfoDayHour] = useState({
        hour: null,
        day: null,
        id: null
    });

    const { usertoken, userInfo } = useContext(AuthContextL);

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

    const loadingAgenda = (itemsformonth) => {
        fetch(`${URL_API}/api/listAgendaSchedule`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
            }
        })
        .then((response) => response.json())
        .then((json) => {
            
        })
        .catch((error) => console.error(error));
    }
    const listByDateAndHourAgenda = (hora, dia, id, vecesSolicitado) => {
        fetch(`${URL_API}/api/medicalAppointmentDateHour`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
            },
            body: JSON.stringify({
                hour: hora,
                day: dia,
                idListAgenda: id,
                amountPerson: vecesSolicitado
            })
        })
            .then((response) => response.json())
            .then((json) => {
                let JsonAgenda2 = json;
                /* console.log(JsonAgenda2.specialist[0].Especialista); */
                if (JsonAgenda2.res == 0) {
                    if (JsonAgenda2.msg == 'Cupos llenos') {
                        setmsgAgenda('Cupos llenos');
                    } else {
                        setmsgAgenda('Habilitado');
                    }
                } else if (JsonAgenda2.res == 1) {
                    if (JsonAgenda2.specialist[0].Especialista == 'jonathan@hotmail.com') {
                        setmsgAgenda('jonathan');
                    } else if (JsonAgenda2.specialist[0].Especialista == 'michael@hotmail.com') {
                        setmsgAgenda('michael');
                    }
                }
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }
    const insertByDateAndHourAgenda = (dia, hora, id, UserId, nombre) => {
        let hourExact = hora.substr(0, 5);
        fetch(`${URL_API}/api/insertPatientMedicalAppointment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
            },
            body: JSON.stringify({
                day: dia,
                hour: hourExact,
                idListAgenda: id,
                UserId: UserId,
                nameSpecialist: nombre
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json.res) {
                    navigation.navigate('Message');
                }
                Alert.alert('Cita Médica', json.msg, [
                    { text: 'OK' }
                ]);
            })
    }

    /* useEffect(() => {
    loadingAgenda();
    }, []); */

    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                /* console.log(time); */
                /* console.log(strTime); */
                /* console.log(!items[strTime]); */

                if (!items[strTime]) {
                    items[strTime] = [];
                    /* console.log(items[strTime]); */
                    /* const numItems = Math.floor(Math.random() * 3 + 1); */
                    const numeroDiaMartes = new Date(strTime).getDay();
                    const arrayHours = ["10:00-10:30", "10:30-11:00", "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-1:00", "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00"];
                    if (numeroDiaMartes === 1) {
                        for (let j = 0; j <= 9; j++) {
                            items[strTime].push({
                                hours: arrayHours[j],
                                day: strTime,
                                id: j,
                                amountPerson: 0
                            });
                        }
                        /* console.log(items[strTime]); */
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
                /* console.log(key); */
            });
            loadingAgenda(newItems);
            /* setItems(newItems); */

        }, 1000);
    }
    const updateDayHour = (hour, day, id) => {
        setInfoDayHour({ ...infoDayHour, day: day, hour: hour, id: id });
    }
    const renderItem = (item) => {
        return (
            <View style={styles.listafecha}>
                <Text style={styles.txtHours}>{item.hours}</Text>
                <View style={styles.flexRow}>
                    <TouchableOpacity style={[styles.btnCupo, { backgroundColor: item.amountPerson == 1 || item.amountPerson == 2 ? '#FF5C58' : '#BCE29E' }]} disabled={item.amountPerson == 1 || item.amountPerson == 2 ? true : false} onPress={() => { updateDayHour(item.hours, item.day, item.id); setModal(true); setLoading(true); listByDateAndHourAgenda(item.hours, item.day, item.id, item.amountPerson); }}>
                        <Text>{item.amountPerson == 1 || item.amountPerson == 2 ? 'Lleno' : 'Cupo'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCupo, { backgroundColor: item.amountPerson == 2 ? '#FF5C58' : '#BCE29E' }]} disabled={item.amountPerson == 2 ? true : false} onPress={() => { updateDayHour(item.hours, item.day, item.id); setModal(true); setLoading(true); listByDateAndHourAgenda(item.hours, item.day, item.id, item.amountPerson); }}>
                        <Text>{item.amountPerson == 2 ? 'Lleno' : 'Cupo'}</Text>
                    </TouchableOpacity>
                </View>
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
                                                { text: 'SI', onPress: () => { insertByDateAndHourAgenda(infoDayHour.day, infoDayHour.hour, infoDayHour.id, userInfo.id, 'Dr. Jonathan'); setModal(false); } },
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
                                                { text: 'SI', onPress: () => { insertByDateAndHourAgenda(infoDayHour.day, infoDayHour.hour, infoDayHour.id, userInfo.id, 'Dr. Michael'); setModal(false) } },
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
                                                    { text: 'SI', onPress: () => { insertByDateAndHourAgenda(infoDayHour.day, infoDayHour.hour, infoDayHour.id, userInfo.id, 'Dr. Michael'); setModal(false) } },
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
                                                        { text: 'SI', onPress: () => { insertByDateAndHourAgenda(infoDayHour.day, infoDayHour.hour, infoDayHour.id, userInfo.id, 'Dr. Jonathan'); setModal(false) } },
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
                            <Text style={[styles.subtituloModal, { color: '#fff' }]}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Agenda
                items={items}
                firstDay={1}
                pastScrollRange={2}
                futureScrollRange={2}
                renderEmptyDate={() => {
                    return (
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
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    txtHours: {
        fontSize: 20
    },
    btnCupo: {
        borderRadius: 5,
        paddingVertical: 7,
        marginTop: 10,
        width: '45%',
        display: 'flex',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#3c4048d9'
        /*   marginBottom: 350 */
    },
    modalView: {
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
        borderRadius: 5,
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
    imgPerfil: {
        width: 90,
        height: 90
    }
})