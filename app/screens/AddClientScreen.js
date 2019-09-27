import React, { useReducer } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextField } from 'react-native-material-textfield';
import {
  Text,
  View,
  Button
} from 'react-native';
import Fetcher from './../utils/Fetcher';
import styles from './../constants/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'


function removeEmailExtension(email) {
  if (email.indexOf('@') > -1)
    return email.split('@')[0];
  return email;
}

function addClientReducer(state, action) {
  const { email } = state;
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.field_name]: action.value
      }
    case 'email_button':
      let newEmail = removeEmailExtension(email) + action.value;
      return {
        ...state,
        email: newEmail,
      }
    case 'mail_not_found':
      return {
        ...state,
        isSearchClient: false,
        isLoading: false,
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
  isSearchClient: true,
  isLoading: false,
};

const AddClientScreen = (props) => {

  const [state, dispatch] = useReducer(addClientReducer, initialState);
  const { email, phone, names, isSearchClient, isLoading, error } = state;

  const createUser = (user) => {
    dispatch({ type: 'submit' });

    isSearchClient ?
      searchClient(email) :
      createClient(user);
  }

  const searchClient = (email) => {
    Fetcher.GETclient(email)
      .then(res => {
        switch (res.status) {
          case 200: {
            // TODO: Parse the body -> get the client_id and redirect
            return res.json().then(body => {
              console.log(`body.id - ${body.id}`);
            })
          }
          case 404: {
            return dispatch({ type: 'mail_not_found' });
          }
          default: {
            return dispatch({ type: 'error', message: 'Проблем със сървъра! Код: ' + res.status })
          }
        }
      })
  }

  const createClient = (user) => {
    Fetcher.POSTclient(user)
      .then((res) => {
        res.json().then((body) => {
          if (res.status !== 200) {
            return dispatch({
              type: 'error',
              message: body.message
            });
          }
          dispatch({ type: 'success' });
          // get the body id and redirect to next screen
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
          <Text style={styles.titleText}>{isSearchClient ? 'Търси клиент в системата' : 'Добави клиент'}</Text>
        </View>

        <View style={styles.fieldsContainer}>
          <TextField
            label='Мейл'
            value={email}
            keyboardType='email-address'
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
              return (
                <View key={index} style={styles.mailExtensionButton}>
                  <Button
                    title={ext}
                    color={'purple'}
                    onPress={() => {
                      dispatch({
                        type: 'email_button',
                        value: ext
                      });
                    }}
                  />
                </View>
              );
            }))}
          </View>

          {!isSearchClient && (
            <>
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
            </>
          )}


          <View style={{ marginTop: 25 }}>
            <Button
              title={isSearchClient ? 'Търси' : 'Добави'}
              color='#841584'
              accessibilityLabel='Добави нов клиент'
              onPress={() => {
                isSearchClient ?
                  searchClient(email)
                  :
                  createUser({
                    email: email,
                    telephone: phone.toString(),
                    name: names,
                  });
              }}
            />
          </View>

          <Text style={styles.error}>{error}</Text>

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

AddClientScreen.navigationOptions = {
  title: 'Добави клиент',
}

export default AddClientScreen;