import React from 'react';
import { ServiceBox } from './ServiceBox';
export const ServiceList = ({ services }) => {
  const Field = ({ text, value }) => (<>
    <span><strong>{text}: </strong>{value}</span><br />
  </>);
  return (<>
    {services.map(({ id, date, kilometers, next_oil_change_km, next_gearbox_oil_change, next_hydraulics_oil_change, is_automatic, notes, clientCarLicensePlate, products, clientCar }) => {
      const car = clientCar.internalCar;
      const inlineCar = car.make + " " + car.model + " " + car.variant + " от " + car.year;

      return (
        <ServiceBox key={id}>
          <div className='d-flex justify-content-between'>
            <div>
              <h5><Field text='Рег. номер' value={clientCarLicensePlate} /></h5>
              <h5>{inlineCar}</h5>
              <p>
                <b>Филтър твърди частици: </b>{clientCar.is_filter_particles ? 'Да' : 'Не'}<br />
                <b>Код на двигателя: </b> {clientCar.engine_code}<br />
              </p>
            </div>
            <div>
              <button className='btn btn-warning'>Редактирай автомобила</button>
            </div>
          </div>
          <hr />

          <div className='d-flex justify-content-between'>
            <div>
              {date && <Field text='Дата' value={new Date(date).toLocaleDateString()} />}
              {kilometers && <Field text='Километри' value={kilometers} />}
              {next_oil_change_km && <Field text='Следваща смяна на масло' value={next_oil_change_km} />}
              {next_hydraulics_oil_change && <Field text='Следваща смяна на хидравликата' value={next_hydraulics_oil_change} />}
              {next_gearbox_oil_change && <Field text='Следваща смяна на масло скоростна к-я' value={next_gearbox_oil_change} />}
              {is_automatic && <Field text='Автоматик' value={is_automatic ? 'Да' : 'Не'} />}
              {notes && <Field text='Забележки' value={notes} />}
            </div>
            <div className='d-none justify-content-end flex-column'>
              <button className='btn btn-warning'>Редактирай сервизирането</button>
              <br />
              <button className='btn btn-danger'>Изтрий сервизирането</button>
            </div>
          </div>
          <table className="table table-striped table-dark mt-4">
            <thead>
              <tr>
                <th scope="col">Тип</th>
                <th scope="col">Код/Вискозитет</th>
                <th scope="col">Марка</th>
                <th scope="col">Количество</th>
              </tr>
            </thead>
            <tbody>
              {products.sort((a, b) => {
                if (a.type < b.type) {
                  return -1;
                }
                if (a.type > b.type) {
                  return 1;
                }
                return 0;
              }).map(({ type, code, brand, service_products }, index) => (<tr key={index}>
                <th scope="row">{translateType(type)}</th>
                <td>{code}</td>
                <td>{brand}</td>
                <td>{service_products.fluid_amount}</td>
              </tr>))}
            </tbody>
          </table>
        </ServiceBox>)
    })}
  </>);
};
const translateType = (type) => {
  switch (type) {
    case 'oil': return 'масло';
    case 'oil_filter': return 'маслен филтър';
    case 'air_filter': return 'въздушен филтър';
    case 'fuel_filter': return 'горивен филтър';
    case 'cabin_filter': return 'филтър купе';
    case 'oil_gearbox': return 'масло скоростна кутия';
    case 'gearbox_filter': return 'филтър скоростна кутия';
    case 'oil_hydraulics': return 'хидравлично масло';
  }
};
