import React from 'react';
import logo from '../images/logo-eloz.png';

export default ({ children, step }) => {
  const currentDate = new Date();

  return (
    <div className="wrapper">
      <header>
        <nav className="navbar navbar-light bg-dark d-flex justify-content-center">
          <img src={logo} className='img-fluid' width="90" height="90" alt="Лого" />
        </nav>
      </header>

      <div className='container my-4' style={{ minHeight: '85vh' }}>
        <h1>Стъпка {step} от 4</h1>
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