import React, { useEffect, useState, useReducer } from 'react';
import Fetcher from '../utils/Fetcher';
import OilData from '../constants/OilData';
import formatJson from './AddCar';
import { FluidFields } from '../components/FluidFields';
import { Spinner } from '../components/Spinner';
import { NextChangeIn } from '../components/NextChangeIn';
import Select from 'react-select';
import Layout from '../components/Layout';
import { GearService } from '../components/GearService';
import { MainService } from '../components/MainService';

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
                [action.product_obj_field_name]: action.value.toUpperCase()
              }
            );
          } else {
            // if the fluid does not exist in the map
            newProducts.set(action.fluid_name,
              {
                type: action.fluid_name,
                [action.product_obj_field_name]: action.value.toUpperCase()
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
      return state;
  }
}

const initialState = {
  // service object related
  kilometers: '',
  next_change_km: '',
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
  gearbox_filter: '',
  next_gearbox_change_km: '',
  // hydraulics service
  oil_hydraulics_amount: '',
  oil_hydraulics_brand: '',
  oil_hydraulics_viscosity: '',
  next_hydraulics_change_km: '',
  // notes,
  notes: '',
  // map of products
  products: new Map(),
  // component related props
  isLoading: false,
}

const AddService = (props) => {
  var initialTime = 0;
  // const { navigate } = props.navigation;
  // const licensePlate = props.navigation.getParam('license_plate');
  const licensePlate = "1";
  const [state, dispatch] = useReducer(addServiceReducer, initialState);
  const [time, setTime] = useState('');

  const [oilViscositiesFromBrand, setOilViscositiesFromBrand] = useState([]);
  const [gearboxViscositiesFromBrand, setGearboxViscositiesFromBrand] = useState([]);
  const [hydraullicViscositiesFromBrand, setHydraullicViscositiesFromBrand] = useState([]);

  const {
    kilometers,
    next_change_km,
    // main service vars
    oil_amount,
    oil_viscosity,
    oil_filter,
    air_filter,
    fuel_filter,
    cabin_filter,
    // gearbox vars
    gear_service_type,
    oil_gearbox_amount,
    oil_gearbox_brand,
    oil_gearbox_viscosity,
    next_gearbox_change_km,
    gearbox_filter,
    // hydraulics vars
    oil_hydraulics_amount,
    oil_hydraulics_brand,
    oil_hydraulics_viscosity,
    next_hydraulics_change_km,
    products,
    // notes
    notes,
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
    const service = {
      date: Date.now(),
      kilometers: kilometers,
      next_oil_change_km: next_change_km !== '' ?
        parseInt(kilometers, 10) + next_change_km * 1000
        :
        NaN,
      next_gearbox_oil_change: next_gearbox_change_km !== '' ?
        parseInt(kilometers, 10) + next_gearbox_change_km * 1000
        :
        NaN,
      next_hydraulics_oil_change: next_hydraulics_change_km !== '' ?
        parseInt(kilometers, 10) + next_hydraulics_change_km * 1000
        :
        NaN,
      length_of_service: Date.now() - initialTime,
      is_automatic: gear_service_type === OilData.gear_service_types[2].value,
      products: Array.from(products.values()),
      notes: notes,
    };


    dispatch({ type: 'add' });
    Fetcher.POSTservice(licensePlate, service)
      .then(res => {
        res.json().then(body => {
          console.log('navigate: ' + res.status);
          if (res.status !== 200) {
            dispatch({
              type: 'error',
              message: body.message
            });
            return;
          }
          dispatch({ type: 'success' });
          // navigate('Home');
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
    <Layout step={4}>
      <h2>Обслужване на автомобил с регистрация {licensePlate}</h2>

      <div className='d-flex justify-content-between'>
        <p><strong>Времетраене:</strong> {time}</p>
        <button className='btn btn-danger' onClick={serviceCompleted}>Приключи Обслужване</button>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <label htmlFor="kilometers">Текуши километри</label>
          <input
            id="kilometers"
            className="form-control"
            type="text"
            placeholder="Въведи текуши километри"
            value={kilometers}
            onChange={(v) =>
              dispatch({
                type: 'field',
                value: v.currentTarget.value,
                field_name: 'kilometers',
              })
            }
          />
        </div>
      </div>

      {error && <p className='text-error'>Грешка: {error}</p>}

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
        viscosity_variety={oilViscositiesFromBrand}
        set_viscosity_variety={setOilViscositiesFromBrand}
      />

      <GearService
        dispatch={dispatch}
        gear_service_type={gear_service_type}
        oil_gearbox_amount={oil_gearbox_amount}
        oil_gearbox_brand={oil_gearbox_brand}
        oil_gearbox_viscosity={oil_gearbox_viscosity}
        next_gearbox_change_km={next_gearbox_change_km}
        gearbox_filter={gearbox_filter}
        viscosity_variety={gearboxViscositiesFromBrand}
        set_viscosity_variety={setGearboxViscositiesFromBrand}
      />
      {/* 
      <HydrallicsService
        dispatch={dispatch}
        oil_hydraulics_amount={oil_hydraulics_amount}
        oil_hydraulics_brand={oil_hydraulics_brand}
        oil_hydraulics_viscosity={oil_hydraulics_viscosity}
        next_hydraulics_change_km={next_hydraulics_change_km}
        viscosity_variety={hydraullicViscositiesFromBrand}
        set_viscosity_variety={setHydraullicViscositiesFromBrand}
      />


      <NotesArea
        dispatch={dispatch}
        notes={notes}
      /> */}

      {/* Invisible content*/}


      {isLoading && (<Spinner />)}
    </Layout>
  );
};

function NotesArea(props) {
  return (
    <>
      <h3>Забележки</h3>
      <hr />
      <div className='row'>
        <div className='col-12'>
          <textarea
            placeholder={'Забележки по обслужването ...'}
            value={props.notes}
            onChange={(v) => {
              props.dispatch({
                type: 'field',
                value: v.currentTarget.value,
                field_name: 'notes',
              })
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
}

function HydrallicsService(props) {
  return (
    <>
      <h3>Хидравлика</h3>
      <hr />

      <FluidFields
        dispatch={props.dispatch}
        img={require('../images/steering_wheel.png')}
        fluid_value={props.oil_hydraulics_amount}
        field_name={'oil_hydraulics_amount'}
        fluid_name={'oil_hydraulics'}
        // oil data
        brand_data={OilData.oil_hydraulics_brands}
        oil_brand={props.oil_hydraulics_brand}
        dropdown_field_name={'oil_hydraulics_brand'}
        // viscosity data
        viscosity_data={props.viscosity_variety}
        set_viscosity_variety={props.set_viscosity_variety}
        oil_viscosity={props.oil_hydraulics_viscosity}
        dropdown_field_name_viscosity={'oil_hydraulics_viscosity'}
      />

      <NextChangeIn
        dispatch={props.dispatch}
        oil_change_options={OilData.oil_hydraulics_change_options}
        next_change_km={props.next_hydraulics_change_km}
        field_name={'next_hydraulics_change_km'}
      />
    </>
  );
}

const DropDownChangeHandler = (dispatch, type, value, field_name) => {
  dispatch({
    type: type,
    value: value,
    field_name: field_name,
  });
}

const SelectComponent = ({ value, type, options, field_name, labelText, dispatch, onChangeHandler }) => {
  return (
    <>
      <label>{labelText}</label>
      <Select
        placeholder={labelText}
        classNamePrefix="select"
        defaultValue={value}
        isSearchable={true}
        name={field_name}
        options={options}
        onChange={(selectedOption) => onChangeHandler(dispatch, type, selectedOption, field_name)}
      />
    </>
  );
}


export default AddService;