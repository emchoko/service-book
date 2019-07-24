import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Connection from './../constants/Connection';
import styles from './../constants/Styles';
import CheckBox from 'react-native-check-box';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

export default function AddCarScreen() {
    const [checkbox, setCheckbox] = useState(false);
    const hp = '';
    const licensePlate = 'CA3123PT';
    const data = [
        { value: 'BMW' },
        { value: 'Mercedes' },
        { value: 'Honda' },
    ];

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.contentContainer}
            >

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Добави кола</Text>
                </View>
                <View style={styles.fieldsContainer}>
                    <TextField
                        label='Регистрационен Номер'
                        value={licensePlate}
                        onChangeText={(text) => { }}
                    />

                    <View style={styles.horizontalDropdownsContainer}>
                        <View style={styles.horizontalDropdown}>
                            <Dropdown
                                label='Марка'
                                data={data}
                            />
                        </View>
                        <View style={styles.horizontalDropdown}>
                            <Dropdown
                                label='Модел'
                                data={data}
                            />
                        </View>
                    </View>

                    <View style={styles.horizontalDropdownsContainer}>
                        <View style={styles.horizontalDropdown}>
                            <Dropdown
                                label='Година'
                                data={data}
                            />
                        </View>
                        <View style={styles.horizontalDropdown}>
                            <Dropdown
                                label='Вариация'
                                data={data}
                            />
                        </View>
                    </View>

                    <View style={styles.horizontalDropdownsContainer}>
                        <View style={styles.horizontalDropdown}>
                            <TextField
                                label='Конски сили'
                                value={hp}
                                keyboardType='numeric'
                                onChangeText={(text) => { }}
                            />
                        </View>
                        <View style={[{ marginTop: 20 }, styles.horizontalDropdown]}>
                            <CheckBox
                                style={{}}
                                isChecked={checkbox}
                                rightText={'Филтър твърди частици'}
                                onClick={() => { setCheckbox(!checkbox) }}
                            />
                        </View>
                    </View>

                    <TextField
                        label='Код на двигателя'
                        value={''}
                        onChangeText={(text) => { }}
                    />

                    <Button
                        title='Добави'
                        color='#841584'
                        accessibilityLabel='Добави нова кола'
                        onPress={() => { }}
                    />

                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}