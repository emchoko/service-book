import React from 'react';
import ServiceBox from './ServiceBox';
export const ServiceList = ({ services }) => {
    return (
        <>
            {services.map(
                ({
                    id,
                    date,
                    kilometers,
                    next_oil_change_km,
                    next_gearbox_oil_change,
                    next_hydraulics_oil_change,
                    is_automatic,
                    notes,
                    clientCarLicensePlate,
                    products,
                    clientCar,
                }) => {
                    const car = clientCar.internalCar;
                    const inlineCar = car.make + ' ' + car.model + ' ' + car.variant + ' от ' + car.year + ' година';

                    return (
                        <ServiceBox
                            key={id}
                            id={id}
                            date={date}
                            car={car}
                            inlineCar={inlineCar}
                            kilometers={kilometers}
                            next_oil_change_km={next_oil_change_km}
                            next_gearbox_oil_change={next_gearbox_oil_change}
                            next_hydraulics_oil_change={next_hydraulics_oil_change}
                            is_automatic={is_automatic}
                            notes={notes}
                            clientCarLicensePlate={clientCarLicensePlate}
                            products={products}
                            clientCar={clientCar}
                        />
                    );
                },
            )}
        </>
    );
};
