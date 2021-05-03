import React from 'react';
import OilData from '../../constants/OilData';
import { FluidFields } from '../FluidFields';
import { NextChangeIn } from './NextChangeIn';
import { WrapperBox } from '../ServiceBox';
export function HydrallicsService(props) {
    return (
        <>
            <WrapperBox>
                <h3 className="mt-3">Хидравлика</h3>
                <hr />

                <FluidFields
                    dispatch={props.dispatch}
                    img={require('../../images/steering_wheel.png')}
                    fluid_value={props.oil_hydraulics_amount}
                    field_name={'oil_hydraulics_amount'}
                    fluid_name={'oil_hydraulics'}
                    // oil data
                    brand_data={OilData.oil_hydraulics_brands}
                    oil_brand={props.oil_hydraulics_brand}
                    dropdown_field_name={'oil_hydraulics_brand'}
                    // viscosity data
                    viscosity_data={props.viscosity_variety}
                    set_viscosity_variety={props.set_viscosity_variety}
                    oil_viscosity={props.oil_hydraulics_viscosity}
                    dropdown_field_name_viscosity={'oil_hydraulics_viscosity'}
                />

                <NextChangeIn
                    dispatch={props.dispatch}
                    oil_change_options={OilData.oil_hydraulics_change_options}
                    next_change_km={props.next_hydraulics_change_km}
                    field_name={'next_hydraulics_change_km'}
                />
            </WrapperBox>
        </>
    );
}
