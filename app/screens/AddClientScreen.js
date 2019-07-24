import React, { useReducer } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextField } from 'react-native-material-textfield';
import {
    Text,
    View,
    Button
} from 'react-native';
import Connection from './../constants/Connection';
import styles from './../constants/Styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'


function removeEmailExtension(email) {
    if (email.indexOf('@') > -1)
        return email.split('@')[0];
    return email;
}

function addClientReducer(state, action) {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.field_name]: action.value
            }
        case 'email_button':add
            let newEmail = removeEmailExtension(state.email) + action.value;
            return {
                ...state,
                email: newEmail,
            }
        case 'submit':
            return {
                ...state,
                isLoading: true
            }
        case 'success':
            return {
                ...state,
                isLoading: false
            }
        case 'error':
            return {
                ...state,
                isLoading: false,
                error: action.message
            }
        default:
            break;
    }
}

const emailExtensionList = ['@gmail.com', '@abv.bg', '@mail.bg', '@icloud.com', '@outlook.com', '@yahoo.com']

const initialState = {
    email: '',
    phone: '',
    names: '',
    isLoading: false
};

export default function AddClientScreen() {

    const [state, dispatch] = useReducer(addClientReducer, initialState);
    const { email, phone, names, isLoading, error } = state;

    const createUser = (user) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(user),
        }
        
        const url = Connection.API_URL;
        const request = new Request(url, options);

        fetch(request)
            .then((res) => {
                res.json().then((body) => {
                    if (res.status !== 200) {
                        return dispatch({
                            type: 'error',
                            message: body.message
                        });
                    }
                    dispatch({ type: 'success' });
                });
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'error',
                    message: err.message
                })
            });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Добави Клиент</Text>
                </View>

                <View style={styles.fieldsContainer}>
                    <TextField
                        label='Мейл'
                        value={email}
                        onChangeText={(text) =>
                            dispatch({
                                type: 'field',
                                value: text,
                                field_name: 'email',
                            })
                        }
                    />

                    <View style={styles.horizontalButtons}>
                        {emailExtensionList.map(((ext, index) => {
                            return (<Button
                                key={index}
                                title={ext}
                                color={'green'}
                                onPress={() => {
                                    dispatch({
                                        type: 'email_button',
                                        value: ext
                                    });
                                }}
                            />);
                        }))}
                    </View>

                    <TextField
                        label='Телефон'
                        value={phone}
                        keyboardType='numeric'
                        onChangeText={(text) =>
                            dispatch({
                                type: 'field',
                                value: text,
                                field_name: 'phone',
                            })
                        }
                    />

                    <TextField
                        label='Имена'
                        value={names}
                        onChangeText={(text) =>
                            dispatch({
                                type: 'field',
                                value: text,
                                field_name: 'names',
                            })
                        }
                    />

                    <Button
                        title='Добави'
                        color='#841584'
                        accessibilityLabel='Добави нов клиент'
                        onPress={() => {
                            dispatch({
                                type: 'submit'
                            });

                            createUser({
                                email: email,
                                telephone: phone.toString(),
                                name: names,
                            });
                        }}
                    />

                    {error && <Text style={styles.error}>Грешка: {error}</Text>}

                    <Spinner
                        visible={isLoading}
                        textContent='Зарежда се ...'
                        textStyle={styles.spinnerTextStyle}
                    />

                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}