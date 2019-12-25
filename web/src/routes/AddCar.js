import React, { useState, useReducer } from 'react';
import Fetcher from '../utils/Fetcher';
import Layout from '../components/Layout';
import { Spinner } from '../components/Spinner';

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
  year: '',
  trim: '',
  power_in_hp: '',
  is_filter_particles: false,
  engine_code: '',
  isLoading: false,
  makeList: [],
  modelList: [],
  yearList: [],
  trimList: []
}

const AddCar = (props) => {
  const { navigate } = props.navigation;
  const licensePlate = props.navigation.getParam('license_plate');
  const clientId = props.navigation.getParam('client_id');
  const [state, dispatch] = useReducer(addCarReducer, initialState);

  const { license_plate, make, model, year, trim, power_in_hp, is_filter_particles, engine_code,
    isLoading, error, makeList, modelList, yearList, trimList } = state;

  useState(() => {
    Fetcher.GETcars('/cars/').then(res => res.json()).then(json => {
      dispatch({
        type: 'field',
        field_name: 'makeList',
        value: json
      });
    }).catch(e => {
      console.log(`Error Occurred!`);
      console.error(e);
    });

    dispatch({
      type: 'field',
      field_name: 'license_plate',
      value: licensePlate,
    });
    return () => { };
  }, []);

  const createCar = () => {
    let car = {
      license_plate: license_plate.toUpperCase(),
      make: make,
      model: model,
      year: year,
      variant: trim,
      is_filter_particles: is_filter_particles,
      engine_code: engine_code.toUpperCase(),
    }
    car.api_car_id = make + model + year + trim;
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
          navigate('AddService', { license_plate: licensePlate.toUpperCase() });
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

  const onDropDownChange = (value, dropdownName) => {
    switch (dropdownName) {
      case 'make':
        Fetcher.GETcars('/cars/' + value).then(res => res.json()).then(json => {
          dispatch({
            type: 'field',
            field_name: 'modelList',
            value: json
          });
        }).catch(e => {
          console.log(`Error Occurred!`);
          console.error(e);
        });
        break;
      case 'model':
        Fetcher.GETcars('/cars/' + make + '/' + value).then(res => res.json()).then(json => {
          dispatch({
            type: 'field',
            field_name: 'yearList',
            value: json
          });
        }).catch(e => {
          console.log(`Error Occurred!`);
          console.error(e);
        });
        break;
      case 'year':
        Fetcher.GETcars('/cars/' + make + '/' + model + '/' + value).then(res => res.json()).then(json => {
          dispatch({
            type: 'field',
            field_name: 'trimList',
            value: json
          });
        }).catch(e => {
          console.log(`Error Occurred!`);
          console.error(e);
        });
        break;
      case 'trim':
        break;
      default:
        break;
    }
    dispatch({
      type: 'field',
      value: value,
      field_name: dropdownName
    });
  }

  return (
    <Layout>

      <h2>Добави кола</h2>

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
            data={makeList}
            value={make}
            onChangeText={(value, _, __) => { onDropDownChange(value, 'make') }}
          />
        </View>
        <View style={styles.horizontalDropdown}>
          <Dropdown
            label='Модел'
            data={modelList}
            value={model}
            onChangeText={(value, _, __) => { onDropDownChange(value, 'model') }}

          />
        </View>
      </View>

      <View style={styles.horizontalDropdownsContainer}>
        <View style={styles.horizontalDropdown}>
          <Dropdown
            label='Година'
            data={yearList}
            value={year}
            onChangeText={(value, _, __) => { onDropDownChange(value, 'year') }}
          />
        </View>
        <View style={styles.horizontalDropdown}>
          <Dropdown
            label='Вариация'
            data={trimList}
            value={trim}
            onChangeText={(value, _, __) => { onDropDownChange(value, 'trim') }}
          />
        </View>
      </View>

      <View style={styles.horizontalDropdownsContainer}>
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
        color='#4F4B4C'
        accessibilitylabel='Добави нова кола'
        onPress={() => { createCar() }}
      />

      {error && <Text style={styles.error}>Грешка: {error}</Text>}

      {isLoading && (<Spinner />)}

    </Layout>
  );
}

export default AddCar;