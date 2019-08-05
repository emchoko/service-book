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
    case 'field': {
      const newProducts = state.products;

      // Used to add (key, value) pairs to the product Map
      if (action.is_product) {
        if (action.is_fluid_addition) {
          if (newProducts.has(action.fluid_name)) {
            // if the fluid exists in the map already
            newProducts.set(action.fluid_name,
              {
                ...newProducts.get(action.fluid_name),
                [action.product_obj_field_name]: action.value
              }
            );
          } else {
            // if the fluid does not exist in the map
            newProducts.set(action.fluid_name,
              {
                type: action.fluid_name,
                [action.product_obj_field_name]: action.value
              }
            );
          }
        } else {
          newProducts.set(action.field_name, action.product_obj);
        }
      }
      return {
        ...state,
        [action.field_name]: action.value,
        products: newProducts
      }
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
  oil_amount: '', //Float
  oil_brand: '',
  oil_viscosity: '',
  oil_filter: '',
  air_filter: '',
  fuel_filter: '',
  cabin_filter: '',
  products: new Map(),
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
    oil_viscosity,
    oil_filter,
    air_filter,
    fuel_filter,
    cabin_filter,
    products,
    // component related props
    isLoading,
    oil_brand,
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
      products: Array.from(products.values()),
    };

    console.log(service);

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
              isFluid={true}
              dispatch={dispatch}
              field_name={'oil_amount'}
              fluid_name={'oil'}
            />

            <View style={styles.horizontalContent}>
              <View style={styles.horizontalDropdown}>
                <Dropdown
                  label='Марка'
                  data={OilData.oil_brands}
                  value={oil_brand}
                  onChangeText={(value, index, data) => {
                    dispatch({
                      type: 'field',
                      value: value,
                      field_name: 'oil_brand',
                      is_product: true,
                      is_fluid_addition: true,
                      fluid_name: 'oil',
                      product_obj_field_name: 'brand',
                    })
                  }}
                />
              </View>
              <View style={styles.horizontalDropdown}>
                <Dropdown
                  label='Вискозитет'
                  data={OilData.viscosities}
                  value={oil_viscosity}
                  onChangeText={(value, index, data) => {
                    dispatch({
                      type: 'field',
                      value: value,
                      field_name: 'oil_viscosity',
                      is_product: true,
                      is_fluid_addition: true,
                      fluid_name: 'oil',
                      product_obj_field_name: 'code',
                    })
                  }}
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
              value={oil_filter}
              dispatch={dispatch}
              field_name={'oil_filter'}
            />
            {/* END Oil filter */}

            {/* Air filter */}
            <SimpleProduct
              img={require('./../assets/images/air_filter.png')}
              label={'Въздушен филтър код'}
              value={air_filter}
              dispatch={dispatch}
              field_name={'air_filter'}
            />
            {/* END Air filter */}

            {/* Fuel filter */}
            <SimpleProduct
              img={require('./../assets/images/fuel_filter.png')}
              label={'Горивен филтър код'}
              value={fuel_filter}
              dispatch={dispatch}
              field_name={'fuel_filter'}
            />
            {/* END Fuel filter */}

            {/* Cabin filter */}
            <SimpleProduct
              img={require('./../assets/images/cabin_filter.png')}
              label={'Филтър купе код'}
              value={cabin_filter}
              dispatch={dispatch}
              field_name={'cabin_filter'}
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
          value={props.value}
          keyboardType={props.isNumeric ? 'numeric' : 'default'}
          onChangeText={(text) => {
            props.dispatch({
              type: 'field',
              value: text,
              field_name: props.field_name,
              is_product: true,
              // This is the product object passed to the state. products Map
              is_fluid_addition: props.isFluid,
              product_obj_field_name: 'fluid_amount',
              fluid_name: props.fluid_name,
              product_obj: props.isFluid ?
                {
                  type: props.field_name,
                  fluid_amount: text,
                }
                :
                {
                  type: props.field_name,
                  code: text
                }
            });
          }}
        />
      </View>
    </View>
  );
}