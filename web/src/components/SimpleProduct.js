import React from 'react';
export function SimpleProduct(props) {
  return (
    <>
      <div className='row'>
        <div className='col-md-6 d-flex justify-content-center'>
          <img src={props.img} className='img-fluid' alt='product icon' />
        </div>
        <div className='col-md-6'>
          <input
            id="license_plate"
            className="form-control"
            type="text"
            placeholder={props.label}
            value={props.value}
            onChange={(v) => {
              props.dispatch({
                type: 'field',
                value: v.currentTarget.value,
                field_name: props.field_name,
                is_product: true,
                // This is the product object passed to the state. products Map
                is_fluid_addition: props.isFluid,
                product_obj_field_name: 'fluid_amount',
                fluid_name: props.fluid_name,
                product_obj: props.isFluid ?
                  {
                    type: props.field_name,
                    fluid_amount: v.currentTarget.value,
                  }
                  :
                  {
                    type: props.field_name,
                    code: v.currentTarget.value.toUpperCase()
                  }
              });
            }} />
        </div>
      </div>
    </>
  );
}
