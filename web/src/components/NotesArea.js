import React from 'react';
export function NotesArea(props) {
  return (<>
    <h3>Забележки</h3>
    <hr />
    <div className='row'>
      <div className='col-12'>
        <textarea placeholder={'Забележки по обслужването ...'} value={props.notes} onChange={(v) => {
          props.dispatch({
            type: 'field',
            value: v.currentTarget.value,
            field_name: 'notes',
          });
        }}></textarea>
      </div>
    </div>
  </>);
}
