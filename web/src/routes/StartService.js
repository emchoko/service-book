import React, { useReducer, useEffect } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { waterfall } from 'async';
import Fetcher from '../utils/Fetcher';
import { Spinner } from '../components/Spinner';
import Layout from '../components/Layout';
import { useCookies } from 'react-cookie';
import DatePicker from 'react-date-picker';
import { ServiceList } from '../components/ServiceList';

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
    case 'date-change':
      console.log('selectedDate: ', action.value);
      return {
        ...state,
        selectedDate: action.value,
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        errorText: action.value,
      }
    case 'services':
      return {
        ...state,
        isLoading: false,
        services: action.value,
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
  licensePlate: '',
  services: [],
  errorText: '',
  selectedDate: new Date(),
  isLoading: false,
  isLoadingService: false,
}

const StartService = (props) => {
  // const { navigate } = props.navigation;
  const [cookies, _, __] = useCookies(['apiToken']);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, isLoadingService, licensePlate, errorText, services, selectedDate } = state;

  useEffect(() => {
    makeCallForServices(selectedDate);
    return () => { };
  }, []);

  const makeCallForServices = (date) => {
    var start = new Date(date);
    start.setHours(0, 0, 0, 0);

    var end = new Date(date);
    end.setHours(23, 59, 59, 999);

    Fetcher.GETservices(start, end)
      .then(result => {
        if (result.status === 200) {
          result.json().then(body => {
            console.log('services');
            console.log(body);
            dispatch({ type: 'services', value: body });
          })
        }
      })
      .catch(e => { console.log(e); dispatch({ type: 'error', errorText: e.message }) });
  }

  const calendarSelectDate = (date) => {
    dispatch({ type: 'date-change', value: date });
    makeCallForServices(date);
  }

  const scanForLicense = () => {
    dispatch({ type: 'submit' });
    Fetcher.PUTsession({
      license_plate: "",
      is_license_plate_required: true
    }, cookies.apiToken)
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
            console.log(res);
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
          }, cookies.apiToken)
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
              console.error(err);
              return next({ message: 'Проблем с Fetch! ' + err.error });
            });
        }
      ], (err, result) => {
        if (err) {
          dispatch({ type: 'error', value: err.message });
        } else {
          dispatch({ type: 'success' });

          if (result) {
            props.history.push({
              pathname: '/add-service',
              state: { license_plate: licensePlate.toUpperCase() }
            });
          } else {
            props.history.push({
              pathname: '/add-client',
              state: { license_plate: licensePlate.toUpperCase() }
            });
          }
        }
      })
    }
  }

  return (
    <Layout step={1}>

      <div className='row'>
        <div className='col-md-6 d-flex justify-content-center flex-column'>
          <h3>Натисни бутона, за да сканираш номер</h3>
          {!isLoading ?
            (
              <button
                className='btn btn-primary'
                accessibilitylabel='Започни обслужване'
                onClick={scanForLicense}
              >
                Сканирай За Номер
            </button>
            ) : (
              <Spinner />
            )}
        </div>
        <div className='col-md-6 d-flex justify-content-center flex-column'>
          <h3 className='mt-5'>Въведи ръчно</h3>
          <label htmlFor="registration-input">Регистрационен номер</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="registration-input"
              aria-describedby="basic-addon3"
              placeholder='Въведи регистрационен номер...'
              autocomplete="off"
              value={licensePlate}
              onChange={(e) => {
                dispatch({
                  type: 'license',
                  value: e.currentTarget.value,
                })
              }}
            />
          </div>

          {isLoadingService ? (
            <Spinner />
          ) : (
              <button
                className='btn btn-primary'
                accessibilitylabel='Започни обслужване'
                onClick={startService}
              >
                Започни обслужване</button>
            )}

          <p className='text-danger'>{errorText}</p>
        </div>
      </div>
      {/* Invisible Content */}

      <hr />
      <h3 className='mt-3'>Завършени обслужвания от <DatePicker
        onChange={calendarSelectDate}
        value={selectedDate}
      />
      </h3>

      {services.length === 0 ? <p className='text-warning'>Няма все още завършени обслужвания!</p> :
        (<>
          <ServiceList services={services} />
        </>)}
    </Layout>
  )
}

export default withRouter(StartService);