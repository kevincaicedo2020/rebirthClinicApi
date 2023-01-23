import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';


export default function ButtonListSelect({ array, setValueInput, setIndexInput, backgroundColor, anchoInput, padding, Logo, nameLogo, sizeLogo, marginBottomInput, colorLogo, marginLeft, defaultButtonText, colorText, fontSize, defaulValue }) {
    return (
        <View style={[styles.viewContainer, { width: anchoInput, padding: padding, marginBottom: marginBottomInput, backgroundColor: backgroundColor }]}>
            <View style={styles.input}>

                <SelectDropdown
                    data={array}
                    onSelect={(selectedItem, index) => {
                        setValueInput(selectedItem); setIndexInput(index + 1);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    buttonStyle={styles.selectList}
                    buttonTextStyle={{ color: colorText, fontSize: fontSize, textAlign: 'left', flex: 1, flexGrow: 1, flexShrink: 1, marginLeft: marginLeft }}
                    defaultButtonText={defaultButtonText}
                    defaultValue={defaulValue}
                />

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
        width: '90%'
    },
    logo:
    {
        width: '10%'
    },
    selectList:
    {
        width: '100%',
        backgroundColor: '#fff',
        flex: 1
    }
})