import React, { useState, useEffect } from 'react';
import { WrapperBox } from '../ServiceBox';
import { ServiceList } from '../ServiceList';
import Fetcher from '../../utils/Fetcher';

export default ({ lp }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        Fetcher.GETservicesForCar(lp)
            .then(res => {
                res.json().then(body => {
                    console.log(body);
                    setServices(body);
                });
            })
            .catch(e => {
                alert('Грешка с историята на автомобила!');
                console.error(e);
            });
    }, []);

    return (
        <WrapperBox>
            <h2>История на обслужванията</h2>

            <ServiceList services={services} />
        </WrapperBox>
    );
};
