import React, { useEffect } from 'react';
import logo from '../images/logo-eloz.png';
import { Link, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { useCookies } from 'react-cookie';


export default withRouter(({ children, step, history }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['apiToken']);

  useEffect(() => {
    if(!cookies.apiToken) {
      history.push('/');
    }
  }, []);

  const currentDate = new Date();
  const percentage = step / 4 * 100 + '%';

  const logout = (e) => {
    removeCookie('apiToken');
    history.push('/');
  }

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
                <button className='btn btn-warning mt-2 mt-sm-0'>Обратно към начало</button>
              </Link>
            </div>
            <div className='col-sm-4 py-2 d-flex justify-content-center'>
              <Link to={'/'}>
                <img src={logo} className='img-fluid' width="100" height="auto" alt="Лого" />
              </Link>
            </div>
            <div className='col-sm-4 d-flex justify-content-center align-items-center'>
              <button className='btn btn-danger mt-2 mt-sm-0' onClick={logout}>Изход</button>
            </div>
          </div>
        </nav>
      </header>

      <div id='wrap' >
        <div id='main' className='container clear-top my-4'>
          {step && (
            <div>
              <p className='text-primary mb-0'>Стъпка {step} от 4</p>
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: percentage }}>
                  {percentage}
                </div>
              </div>
            </div>
          )}
          <hr />
          <div>
            {children}
          </div>
        </div>
      </div>

      <footer className='footer'>
        <div className='bg-dark w-100 d-flex justify-content-center mt-5 p-2 text-white'>
          <p>Всички права запазени © ЕлоЗ, {currentDate.getYear() + 1900}</p>
        </div>
      </footer>
    </div>
  )
});