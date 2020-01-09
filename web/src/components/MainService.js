import React from 'react';
import OilData from '../constants/OilData';
import { SimpleProduct } from './SimpleProduct';
import { FluidFields } from './FluidFields';
import { NextChangeIn } from './NextChangeIn';
import { ServiceBox } from './ServiceBox';
export function MainService(props) {
  return (<>
    <ServiceBox>
      <h2 className='mt-4'>Масло & Филтри</h2>
      <hr />

      <FluidFields dispatch={props.dispatch} img={require('./../images/oil.png')} fluid_value={props.oil_amount} field_name={'oil_amount'} fluid_name={'oil'}
        // oil data
        brand_data={OilData.oil_brands} oil_brand={props.oil_brand} dropdown_field_name={'oil_brand'}
        // viscosity data
        viscosity_data={props.viscosity_variety} set_viscosity_variety={props.set_viscosity_variety} oil_viscosity={props.oil_viscosity} dropdown_field_name_viscosity={'oil_viscosity'} />

      <NextChangeIn dispatch={props.dispatch} oil_change_options={OilData.oil_change_options} next_change_km={props.next_change_km} field_name={'next_change_km'} />

      <SimpleProduct img={require('./../images/oil_filter.png')} label={'Маслен филтър код'} value={props.oil_filter} dispatch={props.dispatch} field_name={'oil_filter'} />

      <SimpleProduct img={require('./../images/air_filter.png')} label={'Въздушен филтър код'} value={props.air_filter} dispatch={props.dispatch} field_name={'air_filter'} />

      <SimpleProduct img={require('./../images/fuel_filter.png')} label={'Горивен филтър код'} value={props.fuel_filter} dispatch={props.dispatch} field_name={'fuel_filter'} />

      <SimpleProduct img={require('./../images/cabin_filter.png')} label={'Филтър купе код'} value={props.cabin_filter} dispatch={props.dispatch} field_name={'cabin_filter'} />
    </ServiceBox>
  </>);
}
