import React, { useEffect, useState, useReducer } from 'react';
import Fetcher from '../utils/Fetcher';
import OilData from '../constants/OilData';
import { Spinner } from '../components/Spinner';
import Select from 'react-select';
import Layout from '../components/Layout';
import { GearService } from '../components/GearService';
import { MainService } from '../components/MainService';
import { HydrallicsService } from '../components/HydrallicsService';
import { NotesArea } from '../components/NotesArea';
import { withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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
  const [cookies, _, __] = useCookies(['apiToken']);

  var initialTime = 0;
  const licensePlate = props.location.state.license_plate;
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
    console.log('service oil: ' + (checkProductsForServiceType(products, ['oil', 'oil_amount', 'oil_brand', 'oil_viscosity', 'oil_filter', 'air_filter', 'fuel_filter', 'cabin_filter'])));


    const service = {
      date: Date.now(),
      kilometers: kilometers,
      next_oil_change_km: next_change_km !== '' ?
        parseInt(kilometers, 10) + next_change_km * 1000
        :
        (checkProductsForServiceType(products, ['oil_amount', 'oil_brand', 'oil_viscosity', 'oil_filter', 'air_filter', 'fuel_filter', 'cabin_filter']) ? 10000 : NaN),
      next_gearbox_oil_change: next_gearbox_change_km !== '' ?
        parseInt(kilometers, 10) + next_gearbox_change_km * 1000
        :
        (checkProductsForServiceType(products, ['oil_gearbox_amount', 'oil_gearbox_brand', 'oil_gearbox_viscosity', 'gearbox_filter']) ? 40000 : NaN),
      next_hydraulics_oil_change: next_hydraulics_change_km !== '' ?
        parseInt(kilometers, 10) + next_hydraulics_change_km * 1000
        :
        (checkProductsForServiceType(products, ['oil_hydraulics_amount', 'oil_hydraulics_brand', 'oil_hydraulics_viscosity']) ? 50000 : NaN),
      length_of_service: Date.now() - initialTime,
      is_automatic: gear_service_type === OilData.gear_service_types[2].value,
      products: Array.from(products.values()),
      notes: notes,
    };


    dispatch({ type: 'add' });
    Fetcher.POSTservice(licensePlate, service, cookies.apiToken)
      .then(res => {
        res.json().then(body => {
          if (res.status !== 200) {
            dispatch({
              type: 'error',
              message: body.message
            });
            return;
          }
          dispatch({ type: 'success' });
          props.history.push('/');
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
      <h2>Обслужване на автомобил с регистрация <span className='text-success'>{licensePlate}</span></h2>

      <div className='d-flex justify-content-between'>
        <p><strong>Времетраене:</strong> {time}</p>
        <button className='btn btn-success' onClick={serviceCompleted}>Приключи Обслужване</button>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <label htmlFor="kilometers">Текуши километри</label>
          <input
            id="kilometers"
            className="form-control"
            type="text"
            autocomplete="off"
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

      {error && <p className='text-danger'>Грешка: {error}</p>}

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
      />

      {/* Invisible content*/}


      {isLoading && (<Spinner />)}
    </Layout>
  );
};

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

const checkProductsForServiceType = (products, types) => {
  for (var x = 0; x < types.length; x++) {
    for (var y = 0; y < products.length; y++) {
      if (products[y].type === types[x])
        return true;
    }
  }
  return false;
}


export default withRouter(AddService);