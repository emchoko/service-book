import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const WrapperBox = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    border-radius: 5px;
    box-shadow: 0px 8.71336px 58.089px rgba(0, 0, 0, 0.15);
`;

const ServiceBox = ({
    id,
    date,
    kilometers,
    next_oil_change_km,
    next_gearbox_oil_change,
    next_hydraulics_oil_change,
    is_automatic,
    notes,
    car,
    inlineCar,
    clientCar,
    products,
}) => {
    return (
        <>
            <WrapperBox>
                <div className="d-flex justify-content-between">
                    <div className="w-75 pr-5">
                        <h6>
                            <Field text="Регистрационен номер" value={clientCar.license_plate} />
                        </h6>
                        <h5>{inlineCar}</h5>
                        <p>
                            <b>Филтър твърди частици: </b>
                            {clientCar.is_filter_particles ? 'Да' : 'Не'}
                            <br />
                            <b>Код на двигателя: </b> {clientCar.engine_code}
                            <br />
                        </p>
                    </div>
                    <div className="w-25">
                        <Link to={'/update-service/' + id} className="btn btn-warning">
                            Редактирай обслужване
                        </Link>
                    </div>
                </div>
                <hr />

                <div className="d-flex justify-content-between">
                    <div className="w-100">
                        {date && <Field text="Дата на обслужване" value={new Date(date).toLocaleDateString()} />}
                        {kilometers && <Field text="Километри" value={kilometers} />}
                        {next_oil_change_km && <Field text="Следваща смяна на масло" value={next_oil_change_km} />}
                        {next_hydraulics_oil_change && <Field text="Следваща смяна на хидравликата" value={next_hydraulics_oil_change} />}
                        {next_gearbox_oil_change && <Field text="Следваща смяна на масло скоростна к-я" value={next_gearbox_oil_change} />}
                        {is_automatic && <Field text="Автоматик" value={is_automatic ? 'Да' : 'Не'} />}
                        {notes && <Field text="Забележки" value={notes} />}
                    </div>
                    <div className="d-none justify-content-end flex-column">
                        <button className="btn btn-warning">Редактирай сервизирането</button>
                        <br />
                        <button className="btn btn-danger">Изтрий сервизирането</button>
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
                        {products
                            .sort((a, b) => {
                                if (a.type < b.type) {
                                    return -1;
                                }
                                if (a.type > b.type) {
                                    return 1;
                                }
                                return 0;
                            })
                            .map(({ type, code, brand, service_products }, index) => (
                                <tr key={index}>
                                    <th scope="row">{translateType(type)}</th>
                                    <td>{code}</td>
                                    <td>{brand}</td>
                                    <td>{service_products.fluid_amount}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </WrapperBox>
        </>
    );
};

const Field = ({ text, value }) => (
    <div>
        <span>
            <strong>{text}: </strong>
            {value}
        </span>
        <hr />
    </div>
);

const translateType = type => {
    switch (type) {
        case 'oil':
            return 'масло';
        case 'oil_filter':
            return 'маслен филтър';
        case 'air_filter':
            return 'въздушен филтър';
        case 'fuel_filter':
            return 'горивен филтър';
        case 'cabin_filter':
            return 'филтър купе';
        case 'oil_gearbox':
            return 'масло скоростна кутия';
        case 'gearbox_filter':
            return 'филтър скоростна кутия';
        case 'oil_hydraulics':
            return 'хидравлично масло';
    }
};

export default ServiceBox;
