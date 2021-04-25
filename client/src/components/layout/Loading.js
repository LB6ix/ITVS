import React, { Fragment } from 'react';
import loading from '../../img/loading.gif';

export default () => (
  <Fragment>
    <img
      src={loading}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Kraunasi, palaukite...'
    />
  </Fragment>
);
