import React from 'react';
import logo from '../images/logo-eloz.png';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

export default ({ children, step }) => {
  const currentDate = new Date();
  const percentage = step / 4 * 100 + '%';
  return (
    <div className="wrapper">
      <Helmet>
        <title>Сервизна история | Елоз - Смени Маслото</title>
        <meta name="description" content="Приложение за отчитане на сервизна история" />
        <link rel="shortcut icon" type="image/png" href="http://www.smenimasloto.bg/wp-content/uploads/2018/05/cropped-eloz-ban-32x32.png" />
      </Helmet>

      <header>
        <nav className="navbar navbar-light bg-dark d-flex justify-content-center">
          <div className='row w-100 d-flex'>
            <div className='col-sm-4 order-1 order-sm-0 d-flex justify-content-center align-items-center'>
              <Link to={'/'}>
                <button className='btn btn-danger mt-2  mt-sm-0'>Обратно към начало</button>
              </Link>
            </div>
            <div className='col-sm-4 d-flex justify-content-center'>
              <Link to={'/'}>
                <img src={logo} className='img-fluid' width="90" height="90" alt="Лого" />
              </Link>
            </div>
            <div className='col-sm-4'></div>
          </div>
        </nav>
      </header>

      <div className='container my-4' style={{ minHeight: '80.5vh' }}>

        <h1>Стъпка {step} от 4</h1>
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: percentage }}>
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