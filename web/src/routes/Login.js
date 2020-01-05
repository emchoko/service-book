import React, { useReducer } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { waterfall } from 'async';
import Fetcher from '../utils/Fetcher';
import { Spinner } from '../components/Spinner';
import Layout from '../components/Layout';

const initialState = {
  username: 'serviz',
  password: '',
  isLoading: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.field]: action.value,
      }

    default:
      return state;
  }
}
const Login = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { username, password, isLoading } = state;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'field', field: 'isLoading', value: true });
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
          />
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
            <button type="submit" className='btn btn-primary'>Вход</button>
          )}
      </form>
    </Layout>
  )
}

export default withRouter(Login);