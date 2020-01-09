import React from 'react';
import OilData from '../constants/OilData';
import { SimpleProduct } from './SimpleProduct';
import { FluidFields } from './FluidFields';
import { NextChangeIn } from './NextChangeIn';
import Select from 'react-select';
import { ServiceBox } from './ServiceBox';
export function GearService(props) {
  return (<>
    <ServiceBox>
      <h3 className='mt-3'>Скоростна к-я & Диференциал</h3>
      <hr />

      <label>Избери обслужване</label>
      <Select placeholder="Избери тип обслужване" defaultValue={props.gear_service_type} classNamePrefix="select" isSearchable={true} options={OilData.gear_service_types} onChange={(v) => {
        console.log('value');
        console.log(v);
        props.dispatch({
          type: 'field',
          value: v.value,
          field_name: 'gear_service_type',
        });
      }} />

      <FluidFields dispatch={props.dispatch} img={require('../images/gearbox_shifter.png')} fluid_value={props.oil_gearbox_amount} field_name={'oil_gearbox_amount'} fluid_name={'oil_gearbox'}
        // oil data
        brand_data={props.gear_service_type === OilData.gear_service_types[2].value ?
          OilData.oil_automatic_gearbox_brands
          :
          OilData.oil_manual_gearbox_brands} oil_brand={props.oil_gearbox_brand} dropdown_field_name={'oil_gearbox_brand'}
        // viscosity data
        viscosity_data={props.viscosity_variety} set_viscosity_variety={props.set_viscosity_variety} oil_viscosity={props.oil_gearbox_viscosity} dropdown_field_name_viscosity={'oil_gearbox_viscosity'} />

      <NextChangeIn dispatch={props.dispatch} oil_change_options={OilData.oil_gearbox_change_options} next_change_km={props.next_gearbox_change_km} field_name={'next_gearbox_change_km'} />

      {props.gear_service_type === OilData.gear_service_types[2].value && (<SimpleProduct img={require('./../images/gearbox_filter.png')} label={'Филтър скоростна к-я'} value={props.gearbox_filter} dispatch={props.dispatch} field_name={'gearbox_filter'} />)}
    </ServiceBox>
  </>);
}
