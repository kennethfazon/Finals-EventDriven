import React from 'react';
import { MDBDataTable } from 'mdbreact';

const TransactionReport = ({data}) => {
  return (
    <>
    <h1 className='h2 d-flex justify-center f-20'><b>Please click any Column Label/th to Sort!, Example Quantity</b></h1>
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
    </>
  );
}

export default TransactionReport;