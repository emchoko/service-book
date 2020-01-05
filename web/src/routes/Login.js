import React, { useReducer, useEffect } from 'react';
import {
  withRouter
} from 'react-router-dom';
import Fetcher from '../utils/Fetcher';
import { Spinner } from '../components/Spinner';
import Layout from '../components/Layout';
import { useCookies } from 'react-cookie';

const initialState = {
  username: 'serviz',
  password: '',
  error: '',
  isLoading: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        isLoading: false,
        [action.field]: action.value,
      }

    default:
      return state;
  }
}
const Login = ({ history }) => {
  const [cookie, setCookie, removeCookie] = useCookies(['apiToken']);

  useEffect(() => {
    if (cookie.apiToken) {
      history.push('/start-service');
    }
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { username, password, isLoading, error } = state;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'field', field: 'isLoading', value: true });

    Fetcher.POSTlogin(username, password)
      .then(res => {
        res.json().then(body => {
          switch (res.status) {
            case 401:
            case 404:
            case 500:
              dispatch({ type: 'field', field: 'error', value: body.message })
              break;
            case 200:
              dispatch({ type: 'field', field: 'password', value: '' })
              // TODO: set cookie with body
              setCookie('apiToken', body.token, {
                expires: new Date(body.expires)
              })
              history.push('/start-service');
              break;
          }
        })

      })
      .catch(e => {
        dispatch({ type: 'field', field: 'error', value: 'Грешка' })
      });
  }

  return (
    <Layout>
      <h2>Вход за сервизна история</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label for="username">Потребителско име</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="username"
            placeholder="Потребителско име"
            value={username}
            onChange={(v) => {
              dispatch({ type: 'field', field: 'username', value: v.currentTarget.value });
            }}
          />
        </div>
        <div className="form-group">
          <label for="password">Парола</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Парола"
            value={password}
            onChange={(v) => {
              dispatch({ type: 'field', field: 'password', value: v.currentTarget.value });
            }}
          />
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
            <button type="submit" className='btn btn-primary'>Вход</button>
          )}
        {error && (<p className='text-danger'>{error}</p>)}
      </form>
    </Layout>
  )
}

export default withRouter(Login);