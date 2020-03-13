import React from 'react';
import { ServiceBox } from '../ServiceBox';
export function NotesArea(props) {
  return (<>
    <ServiceBox>
      <h3 className='mt-3'>Забележки</h3>
      <hr />
      <div className='row'>
        <div className='col-12'>
          <div class="form-group">
            {/* <label for="notes">Забележки по обслужването</label> */}
            <textarea
              className="form-control"
              id="notes"
              rows="10"
              placeholder={'Въведи забележки по обслужването ...'}
              value={props.notes}
              onChange={(v) => {
                props.dispatch({
                  type: 'field',
                  value: v.currentTarget.value,
                  field_name: 'notes',
                });
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </ServiceBox>
  </>);
}
