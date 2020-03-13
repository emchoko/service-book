import React from 'react';
import { ServiceBox } from '../ServiceBox';
import { ServiceList } from '../ServiceList';


export default () => {
    return (
        <ServiceBox>
            <h2>История на обслужванията</h2>

            <ServiceList services={[]} />
        </ServiceBox>
    )
}