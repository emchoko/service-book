import React from 'react';
// import { SegmentedControl } from 'segmented-control';
import { SegmentedControl } from 'segmented-control-react';

export function NextChangeIn(props) {
  return (<>
    <h4 className='mt-3'>Следваща смяна след км:</h4>
    <SegmentedControl
      // style={{ width: "100%", color: 'grey' }} // purple400
      segments={props.oil_change_options}
      variant='dark'
      onChangeSegment={(option) => {
        props.dispatch({
          type: 'field',
          value: props.oil_change_options[option].value,
          field_name: props.field_name
        });
      }} />
  </>);
}
