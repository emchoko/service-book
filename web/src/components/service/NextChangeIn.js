import React from 'react';
import Select from 'react-select';

export function NextChangeIn(props) {
  return (<>
    <h4 className='mt-3'>Следваща смяна след км: <span className="text-danger">ЗАДЪЛЖИТЕЛНО</span></h4>

    <Select
      placeholder={'Избери следваща смяна след км'}
      classNamePrefix="select"
      defaultValue={null}
      name={'next change'}
      options={props.oil_change_options}
      onChange={(selectedOption) => {
        props.dispatch({
          type: 'field',
          value: selectedOption.value,
          field_name: props.field_name
        });
      }}
    />
  </>);
}
