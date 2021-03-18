import React from 'react';
import {Button} from '@material-ui/core';
import 'assets/style/listHeader.css';

function ComponentListHeader(props) {
  return(
    <div className='twoesys-listHeader'>
      <Button className='twoesys-listHeader__button' variant='contained' color='primary' onClick={props.onOpenCreateModal}>Add new item</Button>
    </div>
  )
}

export default ComponentListHeader;