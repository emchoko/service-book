import React from 'react';
import { SimpleProduct } from '../components/SimpleProduct';
export function FluidFields(props) {
  return (<>
    <SimpleProduct img={props.img} label={'Количество течност'} isNumeric={true} isFluid={true} value={props.fluid_value} dispatch={props.dispatch} field_name={props.field_name} fluid_name={props.fluid_name} />

    <div className='row'>
      <div className='col-md-6'>
        <Dropdown
          label='Марка'
          data={props.brand_data}
          value={props.oil_brand}
          onChangeText={(value, index, data) => {
            console.log(data[index].viscosities);
            props.set_viscosity_variety(data[index].viscosities);
            props.dispatch({
              type: 'field',
              value: value,
              field_name: props.dropdown_field_name,
              is_product: true,
              is_fluid_addition: true,
              fluid_name: props.fluid_name,
              product_obj_field_name: 'brand',
            });
          }} />
      </div>
      <div className='col-md-6'>
        <Dropdown label='Вискозитет' data={props.viscosity_data} value={props.oil_viscosity} onChangeText={(value, index, data) => {
          props.dispatch({
            type: 'field',
            value: value,
            field_name: props.dropdown_field_name_viscosity,
            is_product: true,
            is_fluid_addition: true,
            fluid_name: props.fluid_name,
            product_obj_field_name: 'code',
          });
        }} />
      </div>
    </div>
  </>);
}
