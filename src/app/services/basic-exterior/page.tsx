import React from 'react';
import ServiceDetailPage from '../../../components/ServiceDetailPage';

const BasicExteriorPage = () => {
  const title = 'Basic Exterior Wash';
  const price = '$60 (sedan) $80 (suv/truck) $100 (van)';
  const includes = [
    'Hand wash and dry',
    'Wheel and tire cleaning',
    'Window cleaning (exterior) and (interior)',
  ];
    const service = 'basic-exterior';

  return (
    <ServiceDetailPage title={title} price={price} includes={includes} service={service} />
  );
};

export default BasicExteriorPage;
