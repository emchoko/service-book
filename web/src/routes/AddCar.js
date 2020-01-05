import React, { useState, useReducer } from 'react';
import Fetcher from '../utils/Fetcher';
import Layout from '../components/Layout';
import { Spinner } from '../components/Spinner';
// import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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
  const [cookies, _, __] = useCookies(['apiToken']);
  const licensePlate = props.location.state.license_plate;
  const clientId = props.location.state.client_id;
  const [state, dispatch] = useReducer(addCarReducer, initialState);

  const { license_plate, make, model, year, trim, power_in_hp, is_filter_particles, engine_code,
    isLoading, error, makeList, modelList, yearList, trimList } = state;

  useState(() => {
    Fetcher.GETcars('/cars/').then(res => res.json()).then(json => {
      dispatch({
        type: 'field',
        field_name: 'makeList',
        value: formatJson(json)
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

    Fetcher.POSTcar(clientId, car, cookies.apiToken)
      .then((res) => {
        res.json().then((body) => {
          if (res.status !== 200) {
            return dispatch({
              type: 'error',
              message: body.message
            });
          }
          dispatch({ type: 'success' });
          props.history.push({
            pathname: '/add-service',
            state: { license_plate: licensePlate.toUpperCase() }
          })
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

  const onDropDownChange = (option, dropdownName) => {
    switch (dropdownName) {
      case 'make':
        Fetcher.GETcars('/cars/' + option.value).then(res => res.json()).then(json => {
          dispatch({
            type: 'field',
            field_name: 'modelList',
            value: formatJson(json)
          });
        }).catch(e => {
          console.log(`Error Occurred!`);
          console.error(e);
        });
        break;
      case 'model':
        Fetcher.GETcars('/cars/' + make + '/' + option.value).then(res => res.json()).then(json => {
          dispatch({
            type: 'field',
            field_name: 'yearList',
            value: formatJson(json)
          });
        }).catch(e => {
          console.log(`Error Occurred!`);
          console.error(e);
        });
        break;
      case 'year':
        Fetcher.GETcars('/cars/' + make + '/' + model + '/' + option.value).then(res => res.json()).then(json => {
          dispatch({
            type: 'field',
            field_name: 'trimList',
            value: formatJson(json)
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
      value: option.value,
      field_name: dropdownName
    });
  }

  return (
    <Layout step={3}>

      <h2>Добави автомобил</h2>
      <div className='row'>
        <div className='col-md-6'>
          <label htmlFor="license_plate">Регистрационен Номер <span className='text-danger'>(задължително)</span></label>
          <input
            id="license_plate"
            className="form-control"
            type="text"
            autocomplete="off"
            placeholder="Въведи регистрационен номер"
            value={license_plate}
            onChange={(v) =>
              dispatch({
                type: 'field',
                value: v.currentTarget.value,
                field_name: 'license_plate',
              })
            }
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <SelectComponent
            value={make}
            options={makeList}
            type="make"
            labelText={"Избери марка"}
            onChangeHandler={onDropDownChange}
          />
        </div>
        <div className='col-md-6'>
          <SelectComponent
            value={model}
            options={modelList}
            type="model"
            labelText={"Избери модел"}
            onChangeHandler={onDropDownChange}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <SelectComponent
            value={year}
            options={yearList}
            type="year"
            labelText={"Избери година"}
            onChangeHandler={onDropDownChange}
          />
        </div>
        <div className='col-md-6'>
          <SelectComponent
            value={trim}
            options={trimList}
            type="trim"
            labelText={"Избери спецификация"}
            onChangeHandler={onDropDownChange}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <SelectComponent
            value={{ value: false, label: 'Не' }}
            options={[{ value: true, label: 'Да' }, { value: false, label: 'Не' }]}
            type="null"
            labelText={"Филтър твърди частици"}
            onChangeHandler={onDropDownChange}
          />
        </div>
        <div className='col-md-6'>
          <label htmlFor="engine_code">Код на двигателя</label>
          <input
            id="engine_code"
            autocomplete="off"
            className="form-control"
            type="text"
            placeholder="Въведи код на двигателя"
            value={engine_code}
            onChange={(v) =>
              dispatch({
                type: 'field',
                value: v.currentTarget.value,
                field_name: 'engine_code',
              })
            }
          />
        </div>
      </div>

      <button
        className='btn btn-primary mt-2'
        onClick={createCar}
      >
        Напред
      </button>




      {error && <p className='text-danger'>Грешка: {error}</p>}

      {isLoading && (<Spinner />)}

    </Layout>
  );
}

export default withRouter(AddCar);

const SelectComponent = ({ value, type, options, onChangeHandler, labelText }) => {

  return (
    <>
      <label>{labelText}</label>
      <CreatableSelect
        isClearable={true}
        placeholder={labelText}
        classNamePrefix="select"
        defaultValue={value}
        isSearchable={true}
        name={type}
        options={options}
        label="Създай"
        // onInputChange={(selectedOption) => onChangeHandler(selectedOption, type)}
        onChange={(selectedOption) => {
          var option = selectedOption == null ? '' : selectedOption;
          onChangeHandler(option, type)
        }
        }
      />
    </>
  );
}

export function formatJson(json) {
  return json.map(({ value }) => ({ value: value, label: value }));
}
