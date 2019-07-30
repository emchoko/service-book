import React, { useState, useReducer } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Connection from './../constants/Connection';
import styles from './../constants/Styles';
import CheckBox from 'react-native-check-box';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

function addCarReducer(state, action) {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.field_name]: action.value
            }
        case 'add':
            return {
                ...state,
                isLoading: true,
            }
        default:
            break;
    }
}

const initialState = {
    license_plate: '',
    make: '',
    model: '',
    year: 0,
    variant: '',
    power_in_hp: '',
    is_filter_particles: false,
    engine_code: '',
    isLoading: false,
}


export default function AddCarScreen() {
    const [state, dispatch] = useReducer(addCarReducer, initialState);

    const { license_plate, make, model, year, variant, power_in_hp, is_filter_particles, engine_code,
        isLoading, error } = state;

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
                        label='Регистрационен Номер (задължително)'
                        value={license_plate}
                        onChangeText={(text) => {
                            dispatch({
                                type: 'field',
                                value: text,
                                field_name: 'license_plate',
                            });
                        }}
                    />

                    <View style={styles.horizontalDropdownsContainer}>
                        <View style={styles.horizontalDropdown}>
                            <Dropdown
                                label='Марка'
                                data={data}
                                value={make}
                                onChangeText={(value, index, data) => {
                                    dispatch({
                                        type: 'field',
                                        value: value,
                                        field_name: 'make'
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.horizontalDropdown}>
                            <Dropdown
                                label='Модел'
                                data={data}
                                value={model}
                                onChangeText={(value, index, data) => {
                                    dispatch({
                                        type: 'field',
                                        value: value,
                                        field_name: 'model'
                                    });
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.horizontalDropdownsContainer}>
                        <View style={styles.horizontalDropdown}>
                            <Dropdown
                                label='Година'
                                data={data}
                                value={year}
                                onChangeText={(value, index, data) => {
                                    dispatch({
                                        type: 'field',
                                        value: value,
                                        field_name: 'year'
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.horizontalDropdown}>
                            <Dropdown
                                label='Вариация'
                                data={data}
                                value={variant}
                                onChangeText={(value, index, data) => {
                                    dispatch({
                                        type: 'field',
                                        value: value,
                                        field_name: 'variant'
                                    });
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.horizontalDropdownsContainer}>
                        <View style={styles.horizontalDropdown}>
                            <TextField
                                label='Конски сили'
                                value={power_in_hp}
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    dispatch({
                                        type: 'field',
                                        value: text,
                                        field_name: 'power_in_hp',
                                    })
                                }}
                            />
                        </View>
                        <View style={[{ marginTop: 20 }, styles.horizontalDropdown]}>
                            <CheckBox
                                style={{}}
                                isChecked={is_filter_particles}
                                rightText={'Филтър твърди частици'}
                                onClick={() => {
                                    dispatch({
                                        type: 'field',
                                        value: !is_filter_particles,
                                        field_name: 'is_filter_particles',
                                    })
                                }}
                            />
                        </View>
                    </View>

                    <TextField
                        label='Код на двигателя'
                        value={engine_code}
                        onChangeText={(text) => {
                            dispatch({
                                type: 'field',
                                value: text,
                                field_name: 'engine_code',
                            })
                        }}
                    />

                    <Button
                        title='Добави'
                        color='#841584'
                        accessibilityLabel='Добави нова кола'
                        onPress={() => {
                            dispatch({
                                type: 'add'
                            });
                        }}
                    />

                    {error && <Text style={styles.error}>Грешка: {error}</Text>}

                    <Spinner
                        visible={isLoading}
                        textContent={'Зарежда се ...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}