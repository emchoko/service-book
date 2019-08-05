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
        action.value = action.value.toUpperCase();

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
  // main service
  oil_amount: '', //Float
  oil_brand: '',
  oil_viscosity: '',
  oil_filter: '',
  air_filter: '',
  fuel_filter: '',
  cabin_filter: '',
  // gearbox service
  gear_service_type: '',
  oil_gearbox_amount: '',
  oil_gearbox_brand: '',
  oil_gearbox_viscosity: '',
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
    gear_service_type,
    oil_gearbox_amount,
    oil_gearbox_brand,
    oil_gearbox_viscosity,
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

    const service = {
      date: Date.now(),
      kilometers: kilometers,
      next_oil_change_km: parseInt(kilometers, 10) + next_change_km * 1000,
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

          <MainService
            dispatch={dispatch}
            oil_amount={oil_amount}
            oil_brand={oil_brand}
            oil_viscosity={oil_viscosity}
            next_change_km={next_change_km}
            oil_filter={oil_filter}
            air_filter={air_filter}
            fuel_filter={fuel_filter}
            cabin_filter={cabin_filter}
          />

          <GearService
            dispatch={dispatch}
            gear_service_type={gear_service_type}
            oil_gearbox_amount={oil_gearbox_amount}
            oil_gearbox_brand={oil_gearbox_brand}
            oil_gearbox_viscosity={oil_gearbox_viscosity}
          />

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

function GearService(props) {
  return (
    <>
      <Divider
        style={styles.divider}
        borderColor='grey'
        color='grey'
        orientation='left'
      >
        Скоростна к-я & Диференциал
      </Divider>

      <Dropdown
        label='Избери обслужване'
        data={OilData.gear_service_types}
        value={props.gear_service_type}
        onChangeText={(value, index, data) => {
          props.dispatch({
            type: 'field',
            value: value,
            field_name: 'gear_service_type',
          });
        }}
      />

      <FluidFields
        dispatch={props.dispatch}
        fluid_value={props.oil_gearbox_amount}
        field_name={'oil_gearbox_amount'}
        fluid_name={'oil_gearbox'}
        // oil data
        brand_data={OilData.oil_gearbox_brands}
        oil_brand={props.oil_gearbox_brand}
        dropdown_field_name={'oil_gearbox_brand'}
        // viscosity data
        viscosity_data={OilData.gearbox_viscosities}
        oil_viscosity={props.oil_gearbox_viscosity}
        dropdown_field_name_viscosity={'oil_gearbox_viscosity'}
      />


      {props.gear_service_type === OilData.gear_service_types[2].value && (
        <Text>Filter Automatic</Text>
      )}

    </>
  );
}

function MainService(props) {
  return (
    <>
      <Divider style={styles.divider}
        borderColor='grey'
        color='grey'
        orientation='left'
      >
        Масло & Филтри
      </Divider>

      <FluidFields
        dispatch={props.dispatch}
        fluid_value={props.oil_amount}
        field_name={'oil_amount'}
        fluid_name={'oil'}
        // oil data
        brand_data={OilData.oil_brands}
        oil_brand={props.oil_brand}
        dropdown_field_name={'oil_brand'}
        // viscosity data
        viscosity_data={OilData.viscosities}
        oil_viscosity={props.oil_viscosity}
        dropdown_field_name_viscosity={'oil_viscosity'}
      />

      <NextChangeIn
        dispatch={props.dispatch}
        oil_change_options={OilData.oil_change_options}
        next_change_km={props.next_change_km}
      />

      <SimpleProduct
        img={require('./../assets/images/oil_filter.png')}
        label={'Маслен филтър код'}
        value={props.oil_filter}
        dispatch={props.dispatch}
        field_name={'oil_filter'}
      />

      <SimpleProduct
        img={require('./../assets/images/air_filter.png')}
        label={'Въздушен филтър код'}
        value={props.air_filter}
        dispatch={props.dispatch}
        field_name={'air_filter'}
      />

      <SimpleProduct
        img={require('./../assets/images/fuel_filter.png')}
        label={'Горивен филтър код'}
        value={props.fuel_filter}
        dispatch={props.dispatch}
        field_name={'fuel_filter'}
      />

      <SimpleProduct
        img={require('./../assets/images/cabin_filter.png')}
        label={'Филтър купе код'}
        value={props.cabin_filter}
        dispatch={props.dispatch}
        field_name={'cabin_filter'}
      />
    </>
  );

}

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
                  code: text.toUpperCase()
                }
            });
          }}
        />
      </View>
    </View>
  );
}

function FluidFields(props) {
  return (
    <>
      <SimpleProduct
        img={require('./../assets/images/oil.png')}
        label={'Количество течност'}
        isNumeric={true}
        isFluid={true}
        value={props.fluid_value}
        dispatch={props.dispatch}
        field_name={props.field_name}
        fluid_name={props.fluid_name}
      />

      <View style={styles.horizontalContent}>
        <View style={styles.horizontalDropdown}>
          <Dropdown
            label='Марка'
            data={props.brand_data}
            value={props.oil_brand}
            onChangeText={(value, index, data) => {
              props.dispatch({
                type: 'field',
                value: value,
                field_name: props.dropdown_field_name,
                is_product: true,
                is_fluid_addition: true,
                fluid_name: props.fluid_name,
                product_obj_field_name: 'brand',
              })
            }}
          />
        </View>
        <View style={styles.horizontalDropdown}>
          <Dropdown
            label='Вискозитет'
            data={props.viscosity_data}
            value={props.oil_viscosity}
            onChangeText={(value, index, data) => {
              props.dispatch({
                type: 'field',
                value: value,
                field_name: props.dropdown_field_name_viscosity,
                is_product: true,
                is_fluid_addition: true,
                fluid_name: props.fluid_name,
                product_obj_field_name: 'code',
              })
            }}
          />
        </View>
      </View>
    </>

  );
}

function NextChangeIn(props) {
  return (
    <>
      <Text style={styles.labelText}>Следваща смяна след км</Text>

      <SegmentedControls
        options={props.oil_change_options}
        onSelection={(option) => {
          props.dispatch({
            type: 'field',
            value: option,
            field_name: 'next_change_km'
          })
        }}
        selectedOption={props.next_change_km}
      />
    </>
  );
}