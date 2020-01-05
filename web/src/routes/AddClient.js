import React, { useReducer, useEffect } from 'react';
import {
  withRouter
} from 'react-router-dom';
import Fetcher from './../utils/Fetcher';
import { Spinner } from '../components/Spinner';
import Layout from '../components/Layout';
import { useCookies } from 'react-cookie';


function removeEmailExtension(email) {
  if (email.indexOf('@') > -1)
    return email.split('@')[0];
  return email;
}

function addClientReducer(state, action) {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.field_name]: action.value
      }
    case 'mail_not_found':
      return {
        ...state,
        isSearchClient: false,
        isLoading: false,
      }
    case 'submit':
      return {
        ...state,
        isLoading: true
      }
    case 'success':
      return {
        ...state,
        isLoading: false
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        error: action.message
      }
    default:
      break;
  }
}

const emailExtensionList = ['@gmail.com', '@abv.bg', '@mail.bg', '@icloud.com', '@outlook.com', '@yahoo.com']


const AddClient = (props) => {
  const licensePlate = props.location.state.license_plate;
  const [cookies, _, __] = useCookies(['apiToken']);
  
  const initialState = {
    license_plate: licensePlate,
    phone: '',
    isSearchClient: false,
    isLoading: false,
  };
  const [state, dispatch] = useReducer(addClientReducer, initialState);
  const { license_plate, phone, isSearchClient, isLoading, error } = state;

  const createUser = (user) => {
    dispatch({ type: 'submit' });

    // isSearchClient ?
    // searchClient(email) :
    createClient(user);
  }

  const searchClient = (email) => {
    Fetcher.GETclient(email)
      .then(res => {
        switch (res.status) {
          case 200: {
            dispatch({ type: 'success' });
            return res.json().then(body => {
              props.history.push({
                pathname: '/add-car',
                state: { license_plate: licensePlate, client_id: body.id }
              });
            })
          }
          case 404: {
            return dispatch({ type: 'mail_not_found' });
          }
          default: {
            return dispatch({ type: 'error', message: 'Проблем със сървъра! Код: ' + res.status })
          }
        }
      })
  }

  const createClient = (user) => {
    Fetcher.POSTclient(user, cookies.apiToken)
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
            pathname: '/add-car',
            state: { license_plate: licensePlate, client_id: body.id }
          })
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'error',
          message: err.message
        })
      });
  }

  return (
    <Layout step={2}>
      <h2>Добави клиент към автомобил с регистрация <span className='text-success'>{license_plate}</span></h2>
      {/* <div className='row'>
        <div className='col-md-6'>
          <label htmlFor="email">Имейл</label>
          <input
            id="email"
            className="form-control"
            type="email"
            placeholder="Въведи имейл на клиента"
            value={email}
            onChange={(v) =>
              dispatch({
                type: 'field',
                value: v.currentTarget.value,
                field_name: 'email',
              })
            }
          />
        </div>
      </div>

      {
        emailExtensionList.map(((ext, index) => {
          return (
            <button
              key={index}
              className='btn btn-success mt-2 mr-1'
              onClick={(e) => {
                dispatch({
                  type: ' tton',
                  value: ext
                });
              }}
            >
              {ext}
            </button>
          );
        }))
      } */}

      <br />
      <>
        <div className='row'>
          <div className='col-md-6'>
            <label htmlFor="phone">Телефон</label>
            <input
              id="phone"
              className="form-control w-75"
              type="text"
              autocomplete="off"
              placeholder="Въведи телефон на клиента"
              value={phone}
              onChange={(v) =>
                dispatch({
                  type: 'field',
                  value: v.currentTarget.value,
                  field_name: 'phone',
                })
              }
            />
          </div>
        </div>
      </>

      <br />
      <button
        className='btn btn-primary d-inline-block mt-1'
        accessibilitylabel='Добави нов клиент'
        onClick={() => {
          createUser({
            license_plate: licensePlate,
            telephone: phone.toString(),
          });
        }}
      >Давай</button>

      <p className='text-danger'>{error}</p>
      {
        isLoading && (
          <Spinner />
        )
      }
    </Layout>
  );
}

export default withRouter(AddClient);