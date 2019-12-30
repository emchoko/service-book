import React from 'react';
import logo from '../images/logo-eloz.png';
import { Link } from 'react-router-dom';

export default ({ children, step }) => {
  const currentDate = new Date();
  const percentage = step/4*100 + '%';
  return (
    <div className="wrapper">
      <header>
        <nav className="navbar navbar-light bg-dark d-flex justify-content-center">
          <Link to={'/'}>
            <img src={logo} className='img-fluid' width="90" height="90" alt="Лого" />
          </Link>

        </nav>
      </header>

      <div className='container my-4' style={{ minHeight: '80.5vh' }}>
        <Link to={'/'}>
          <button className='btn btn-danger'>Обратно към начало</button>
        </Link>
        <h1>Стъпка {step} от 4</h1>
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: percentage}}>
            {percentage}
          </div>
        </div>
        <hr />
        {children}
      </div>

      <footer>
        <div className='bg-dark w-100 d-flex justify-content-center mt-5 p-2 text-white'>
          <p>Всички права запазени © ЕлоЗ, {currentDate.getYear() + 1900}</p>
        </div>
      </footer>
    </div>
  )
};