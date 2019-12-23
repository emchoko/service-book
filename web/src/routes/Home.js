import React, { useReducer } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { waterfall } from 'async';
import { CircleSpinner } from "react-spinners-kit";
import Fetcher from '../utils/Fetcher';

function reducer(state, action) {
  switch (action.type) {
    case 'submit':
      return {
        ...state,
        isLoading: true,
        errorText: '',
      }
    case 'submit-service':
      return {
        ...state,
        isLoadingService: true,
        errorText: '',
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
        isLoadingService: false,
        errorText: '',
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        errorText: action.value,
      }
    case 'license':
      return {
        ...state,
        licensePlate: action.value,
      }
    case 'info':
      return {
        ...state,
        infoText: action.value,
      }
  }
}

const initialState = {
  licensePlate: 'ca3191kt',
  infoText: 'Натисни бутона, за да започнеш сканирането.',
  errorText: '',
  isLoading: false,
  isLoadingService: false,
}

const Home = (props) => {
  const { navigate } = props.navigation;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, isLoadingService, licensePlate, infoText, errorText } = state;

  const scanForLicense = () => {
    dispatch({ type: 'submit' });
    Fetcher.PUTsession({
      license_plate: "",
      is_license_plate_required: true
    })
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: 'info',
            value: 'Системата обработва регистрационния номер',
          });

          checkForNewLicensePlate(500);
        } else {
          dispatch({
            type: 'info',
            value: 'Проблем със сървъра! Код ' + res.status,
          })
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  const checkForNewLicensePlate = (timeout) => {
    setTimeout(() => {
      Fetcher.GETsession()
        .then(res => {
          if (res.status === 200) {
            res.json()
              .then(body => {
                if (!body.is_license_plate_required) {
                  dispatch({ type: 'success' });
                  dispatch({
                    type: 'license',
                    value: body.license_plate
                  });
                } else {
                  checkForNewLicensePlate(timeout);
                }
              })
          } else {
            dispatch({
              type: 'info',
              value: 'Проблем със сървъра! Код ' + res.status,
            })
          }
        })
        .catch(e => {
          console.log(e);
        })
    }, timeout);
  }

  const startService = () => {
    if (licensePlate === '') {
      dispatch({ type: 'error', value: '* Полето е задължително' })
    } else {

      dispatch({ type: 'submit-service' });

      waterfall([
        (next) => {
          Fetcher.PUTsession({
            license_plate: "",
            is_license_plate_required: true
          })
            .then(res => {
              if (res.status === 200) {
                return next(null);
              } else {
                return next({ message: 'Проблем със сървъра! Код ' + res.status })
              }
            })

        },
        (next) => {
          Fetcher.GETlicensePlate(licensePlate)
            .then(res => {
              console.log('GETlicensePlate(): ' + res.status);
              switch (res.status) {
                case 200:
                  return next(null, true);
                case 404:
                  return next(null, false);
                default:
                  return next({ message: 'Проблем със сървъра при взимането на регистрационния номер! Код ' + res.status });
              }
            })
            .catch(err => {
              return next({ message: 'Проблем с Fetch! ' + err.error });
            });
        }
      ], (err, result) => {
        if (err) {
          dispatch({ type: 'error', value: err.message });
        } else {
          dispatch({ type: 'success' });

          if (result) {
            navigate('AddService', { license_plate: licensePlate.toUpperCase() });
          } else {
            navigate('AddClient', { license_plate: licensePlate.toUpperCase() });
          }
        }
      })
    }
  }

  return (
    <>
        {!isLoading ?
          (
            <button
              className='btn-primary'
              accessibilityLabel='Започни обслужване'
              onPress={scanForLicense}
            >
              Сканирай За Номер
            </button>
          ) : (
            <CircleSpinner color="yellow"/>
          )}
        <p>{infoText}</p>

        <hr/>          
        <h2>Въведи ръчно</h2>
        
        <input
          placeholder='Регистрационен номер'
          value={licensePlate}
          onChangeText={(text) => {
            dispatch({
              type: 'license',
              value: text,
            })
          }}
        />
        {isLoadingService ? (
          <CircleSpinner color="yellow"/>
        ) : (
            <button
              className='btn btn-primary'
              accessibilityLabel='Започни обслужване'
              onPress={startService}
            >
              Започни обслужване</button>
          )}

        <p className='text-danger'>{errorText}</p>
        {/* Invisible Content */}
    </>
  )
}

export default Home;