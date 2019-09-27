import React, { useState, useReducer } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import styles from './../constants/Styles';
import CheckBox from 'react-native-check-box';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Fetcher from '../utils/Fetcher';

function addCarReducer(state, action) {
  switch (action.type) {
    case 'field':
      // capitalize license number and engine code
      if (action.field_name === 'license_plate'
        || action.field_name === 'engine_code') {
        action.value = action.value.toUpperCase();
      }
      return {
        ...state,
        [action.field_name]: action.value
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
        error: null,
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

const AddCarScreen = (props) => {
  const { navigate } = props.navigation;
  const licensePlate = props.navigation.getParam('license_plate');
  const clientId = props.navigation.getParam('client_id');
  const [state, dispatch] = useReducer(addCarReducer, initialState);

  const { license_plate, make, model, year, variant, power_in_hp, is_filter_particles, engine_code,
    isLoading, error } = state;

  useState(() => {
    dispatch({
      type: 'field',
      field_name: 'license_plate',
      value: licensePlate,
    })
    return () => {};
  }, []);

  const data = [
    { value: 'BMW' },
    { value: 'Mercedes' },
    { value: 'Honda' },
  ];

  const years = [
    { value: 1998 },
    { value: 1999 },
    { value: 2000 },
    { value: 2001 },
    { value: 2002 },
    { value: 2003 },
    { value: 2004 },
    { value: 2005 },
    { value: 2006 },
    { value: 2007 },
    { value: 2008 },
    { value: 2009 },
  ];

  const createCar = () => {
    let car = {
      license_plate: license_plate,
      make: make,
      model: model,
      year: year,
      variant: variant,
      power_in_hp: power_in_hp,
      is_filter_particles: is_filter_particles,
      engine_code: engine_code,
    }
    // TODO: get api_car_id
    car.api_car_id = Math.floor(Math.random() * (1 - 10000) + 1);
    dispatch({ type: 'add' });
    console.log(car);

    Fetcher.POSTcar(clientId, car)
      .then((res) => {
        res.json().then((body) => {
          if (res.status !== 200) {
            return dispatch({
              type: 'error',
              message: body.message
            });
          }
          dispatch({ type: 'success' });
          navigate('AddService', { license_plate: licensePlate });
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'error',
          message: err.message,
        });
      });
  }

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
                data={years}
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
            onPress={() => { createCar() }}
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

AddCarScreen.navigationOptions = {
  title: 'Добави кола',
}

export default AddCarScreen;