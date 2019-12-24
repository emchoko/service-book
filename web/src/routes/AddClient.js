import React, { useReducer } from 'react';
import Fetcher from './../utils/Fetcher';
import { Spinner } from '../components/Spinner';


function removeEmailExtension(email) {
  if (email.indexOf('@') > -1)
    return email.split('@')[0];
  return email;
}

function addClientReducer(state, action) {
  const { email } = state;
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.field_name]: action.value
      }
    case 'email_button':
      let newEmail = removeEmailExtension(email) + action.value;
      return {
        ...state,
        email: newEmail,
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

const initialState = {
  email: '',
  phone: '',
  names: '',
  isSearchClient: true,
  isLoading: false,
};

const AddClient = (props) => {
  const { navigate } = props.navigation;
  const licensePlate = props.navigation.getParam('license_plate');
  const [state, dispatch] = useReducer(addClientReducer, initialState);
  const { email, phone, names, isSearchClient, isLoading, error } = state;

  const createUser = (user) => {
    dispatch({ type: 'submit' });

    isSearchClient ?
      searchClient(email) :
      createClient(user);
  }

  const searchClient = (email) => {
    Fetcher.GETclient(email)
      .then(res => {
        switch (res.status) {
          case 200: {
            dispatch({ type: 'success' });
            return res.json().then(body => {
              navigate('AddCar', { license_plate: licensePlate, client_id: body.id });
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
    Fetcher.POSTclient(user)
      .then((res) => {
        res.json().then((body) => {
          if (res.status !== 200) {
            return dispatch({
              type: 'error',
              message: body.message
            });
          }
          dispatch({ type: 'success' });
          navigate('AddCar', { license_plate: licensePlate, client_id: body.id });
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
    <>
      <h2>{isSearchClient ? 'Търси клиент в системата' : 'Добави клиент'}</h2>

      <label for="email">Имейл</label>
      <input
        id="email"
        className="form-control form-control-lg"
        type="email"
        placeholder=".form-control-lg"
        value={email}
        onChange={(v) =>
          dispatch({
            type: 'field',
            value: v.currentTarget.value,
            field_name: 'email',
          })
        }
      />

      {
        emailExtensionList.map(((ext, index) => {
          return (
            <button
              key={index}
              className='btn btn-success'
              onClick={(e) => {
                dispatch({
                  type: 'email_button',
                  value: ext
                });
              }}
            >
              {ext}
            </button>
          );
        }))
      }

      {
        !isSearchClient && (
          <>
            <label for="phone">Телефон</label>
            <input
              id="phone"
              className="form-control form-control-lg"
              type="text"
              placeholder=".form-control-lg"
              value={phone}
              onChange={(v) =>
                dispatch({
                  type: 'field',
                  value: v.currentTarget.value,
                  field_name: 'phone',
                })
              }
            />

            <label for="names">Имена</label>
            <input
              id="names"
              className="form-control form-control-lg"
              type="text"
              placeholder=".form-control-lg"
              value={names}
              onChange={(v) =>
                dispatch({
                  type: 'field',
                  value: v.currentTarget.value,
                  field_name: 'names',
                })
              }
            />
          </>
        )
      }

      <button
        className='btn btn-primary'
        accessibilityLabel='Добави нов клиент'
        onClick={() => {
          isSearchClient ?
            searchClient(email)
            :
            createUser({
              email: email,
              telephone: phone.toString(),
              name: names,
            });
        }}
      >
        {isSearchClient ? 'Търси' : 'Добави'}
      </button>

      <p className='text-danger'>{error}</p>
      {
        isLoading && (
          <Spinner />
        )
      }
    </>
  );
}

export default AddClient;