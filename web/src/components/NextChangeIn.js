import React from 'react';
import formatJson from '../routes/AddCar';
import { SegmentedControl } from 'segmented-control';
export function NextChangeIn(props) {
  return (<>
    <h4 className='mt-3'>Следваща смяна след км:</h4>
    <SegmentedControl style={{ width: "100%", color: 'grey' }} // purple400
      options={props.oil_change_options} setValue={(option) => {
        props.dispatch({
          type: 'field',
          value: option,
          field_name: props.field_name
        });
      }} />
  </>);
}
