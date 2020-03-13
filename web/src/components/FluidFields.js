import React from 'react';
import { SimpleProduct } from '../components/SimpleProduct';
import { formatJson } from '../routes/AddCar';
import Select from 'react-select';

export function FluidFields(props) {
  return (<>
    <SimpleProduct img={props.img} label={'Количество течност'} isNumeric={true} isFluid={true} value={props.fluid_value} dispatch={props.dispatch} field_name={props.field_name} fluid_name={props.fluid_name} />

    <div className='row'>
      <div className='col-md-6'>
        <label>Марка</label>
        <Select
          placeholder={'Марка'}
          classNamePrefix="select"
          defaultValue={props.oil_brand}
          isSearchable={true}
          name={'марка масло'}
          options={props.brand_data}
          onChange={(value) => {
            props.set_viscosity_variety(formatJson(value.viscosities));
            props.dispatch({
              type: 'field',
              value: value.value,
              field_name: props.dropdown_field_name,
              is_product: true,
              is_fluid_addition: true,
              fluid_name: props.fluid_name,
              product_obj_field_name: 'brand',
            });
          }}
        />
      </div>
      <div className='col-md-6'>
        <label>Вискозитет</label>
        <Select
          placeholder={'Вискозитет'}
          classNamePrefix="select"
          defaultValue={props.oil_brand}
          isSearchable={true}
          name={'вискозитет масло'}
          options={formatJson(props.viscosity_data)}
          onChange={(value) => {
            props.dispatch({
              type: 'field',
              value: value.value,
              field_name: props.dropdown_field_name_viscosity,
              is_product: true,
              is_fluid_addition: true,
              fluid_name: props.fluid_name,
              product_obj_field_name: 'code',
            });
          }}
        />
      </div>
    </div>
  </>);
}
