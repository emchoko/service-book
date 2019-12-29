import React from 'react';
import formatJson from '../routes/AddCar';
import { SegmentedControl } from 'segmented-control';
export function NextChangeIn(props) {
  return (<>
    <p className=''>Следваща смяна след км</p>
    <SegmentedControl style={{ width: "100%", color: 'grey' }} // purple400
      options={formatJson(props.oil_change_options)} setValue={(option) => {
        props.dispatch({
          type: 'field',
          value: option,
          field_name: props.field_name
        });
      }} />
  </>);
}
