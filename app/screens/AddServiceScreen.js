import React, { useEffect, useState, useReducer } from 'react';
import { View, Text, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import styles from './../constants/Styles';
import { SegmentedControls } from 'react-native-radio-buttons';
import Fetcher from '../utils/Fetcher';

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const leftOverseconds = seconds % 60;
  const minutes = (seconds - leftOverseconds) / 60;
  return `${(minutes < 10) ? `0${minutes}` : `${minutes}`}:${(leftOverseconds < 10) ? `0${leftOverseconds}` : `${leftOverseconds}`}`;
}

function addServiceReducer(state, action) {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.field_name]: action.value,
      }
    case 'add':
      return {
        ...state,
        isLoading: true,
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        error: action.message,
      }
    default:
      break;
  }
}

const kmOptions = [10, 15, 50, 60];

const initialState = {
  kilometers: '',
  next_change_km: kmOptions[0],
  length_of_service: 0,
  isLoading: false
}

export default function AddServiceScreen() {

  const [state, dispatch] = useReducer(addServiceReducer, initialState);
  const [time, setTime] = useState('');

  const { kilometers, next_change_km, isLoading, error } = state;

  useEffect(() => {
    initialTime = Date.now();

    const timeInterval = setInterval(() => {
      setTime(formatTime(Date.now() - initialTime));
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const serviceCompleted = () => {
    // TODO: use license_plate from the global state
    const license_plate = 'CA3131KT';
    const intKm = parseInt(kilometers, 10);

    const service = {
      date: Date.now(),
      kilometers: intKm,
      next_change_km: intKm + next_change_km * 1000,
      length_of_service: Date.now() - initialTime,
    };

    dispatch({ type: 'add' });
    Fetcher.POSTservice(license_plate, service)
      .then(res => {
        res.json().then(body => {
          if (res.status !== 200) {
            dispatch({
              type: 'error',
              message: body.message
            });
          }
          dispatch({ type: 'success' })
        })
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: 'error',
          message: err.message
        });
      });

  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Обслужване</Text>
        </View>

        <View style={styles.fieldsContainer}>
          <Text style={styles.labelText}>Времетраене</Text>
          <Text style={styles.timer}>{time}</Text>

          <TextField
            label='Текущи километри'
            value={kilometers}
            keyboardType='numeric'
            onChangeText={(text) => {
              dispatch({
                type: 'field',
                value: text,
                field_name: 'kilometers',
              });
            }}
          />

          <Text style={styles.labelText}>Следваща смяна след</Text>

          <SegmentedControls
            options={kmOptions}
            onSelection={(option) => {
              dispatch({
                type: 'field',
                value: option,
                field_name: 'next_change_km'
              })
            }}
            selectedOption={next_change_km}
          />

          <Button
            title='Приключи'
            color='#841584'
            accessibilityLabel='Добави ново обслужване'
            onPress={() => { serviceCompleted() }}
          />

          {error && <Text style={styles.error}>Грешка: {error}</Text>}

          <Spinner
            visible={isLoading}
            animation='slide'
            textStyle={styles.spinnerTextStyle}
            textContent='Зарежда се ...'
          />

        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};