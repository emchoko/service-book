import React, { useEffect, useState, useReducer } from 'react';
import {
  Image,
  View,
  Text,
  Button,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Divider from 'react-native-divider';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import styles from './../constants/Styles';
import { SegmentedControls } from 'react-native-radio-buttons';
import Fetcher from '../utils/Fetcher';
import OilData from '../constants/OilData';

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

const initialState = {
  // service object related
  kilometers: '',
  next_change_km: OilData.oil_change_options[0],
  length_of_service: 0,
  oil_amount: '',
  // component related props
  isLoading: false,
}

export default function AddServiceScreen() {

  const [state, dispatch] = useReducer(addServiceReducer, initialState);
  const [time, setTime] = useState('');

  const { 
    kilometers, 
    next_change_km,
    oil_amount, 
    isLoading, 
    error } = state;

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
          <View style={styles.horizontalContent}>
            <View>
              <Text style={styles.labelText}>Времетраене</Text>
              <Text style={styles.timer}>{time}</Text>
            </View>
            <Button
              title='Приключи'
              color='#841584'
              accessibilityLabel='Добави ново обслужване'
              onPress={() => { serviceCompleted() }}
            />
          </View>

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

          {error && <Text style={styles.error}>Грешка: {error}</Text>}

          {/* Main service */}
          <View>
            <Divider style={styles.divider}
              borderColor='grey'
              color='grey'
              orientation='left'
            >
              Основно обслужване
          </Divider>

            {/* Motor Oil Information */}
            <SimpleProduct
              img={require('./../assets/images/oil.png')}
              label={'Количество масло'}
              isNumeric={true}
              value={oil_amount}
              dispatch={dispatch}
              field_name={'oil_amount'}
            />

            <View style={styles.horizontalContent}>
              <View style={styles.horizontalDropdown}>
                <Dropdown
                  label='Марка'
                  data={OilData.oil_brands}
                  value={''}
                  onChangeText={(value, index, data) => { }}
                />
              </View>
              <View style={styles.horizontalDropdown}>
                <Dropdown
                  label='Вискозитет'
                  data={OilData.viscosities}
                  value={''}
                  onChangeText={(value, index, data) => { }}
                />
              </View>
            </View>

            <Text style={styles.labelText}>Следваща смяна след км</Text>
            <SegmentedControls
              options={OilData.oil_change_options}
              onSelection={(option) => {
                dispatch({
                  type: 'field',
                  value: option,
                  field_name: 'next_change_km'
                })
              }}
              selectedOption={next_change_km}
            />
            {/* END Motor Oil Information */}

            {/* Oil filter */}
            <SimpleProduct
              img={require('./../assets/images/oil_filter.png')}
              label={'Маслен филтър код'}
              // TODO: change to this -> value={air_filter}
              value={''}
              dispatch={dispatch}
              field_name={'oil_filter'}
            />
            {/* END Oil filter */}

            {/* Air filter */}
            <SimpleProduct
              img={require('./../assets/images/air_filter.png')}
              label={'Въздушен филтър код'}
              // TODO: change to this -> value={air_filter}
              value={''}
              dispatch={dispatch}
              field_name={'air_filter'}
            />
            {/* END Air filter */}

            {/* Fuel filter */}
            <SimpleProduct
              img={require('./../assets/images/fuel_filter.png')}
              label={'Горивен филтър код'}
              // TODO: change to this -> value={air_filter}
              value={''}
              dispatch={dispatch}
              field_name={'fuel_filter'}
            />
            {/* END Fuel filter */}

            {/* Cabin filter */}
            <SimpleProduct
              img={require('./../assets/images/cabin_filter.png')}
              label={'Филтър купе код'}
              // TODO: change to this -> value={air_filter}
              value={''}
              dispatch={dispatch}
              field_name={'Cabin_filter'}
            />
            {/* END Cabin filter */}
          </View>
          {/* END Main service */}

          {/* Invisible content*/}

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

function SimpleProduct(props) {
  return (
    <View style={styles.horizontalDropdownsContainer}>
      <View style={[{ alignItems: 'center', }, styles.horizontalDropdown]}>
        <Image source={props.img} style={styles.serviceIcon} />
      </View>
      <View style={styles.horizontalDropdown}>
        <TextField
          label={props.label}
          // TODO: change to this -> value={oil_amount}
          value={props.value}
          keyboardType={props.isNumeric ? 'numeric' : 'default'}
          onChangeText={(text) => {
            props.dispatch({
              type: 'field',
              value: text,
              field_name: props.field_name,
            });
          }}
        />
      </View>
    </View>
  );
}