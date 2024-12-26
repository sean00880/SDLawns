import React from 'react';
import ServiceDetailPage from '../../../components/ServiceDetailPage';

const BasicInteriorPage = () => {
  const title = 'Basic Interior Cleaning';
  const price = '$70 (sedan) $110 (suv/truck) $130 (van)';
  const includes = [
    'Window cleaning (exterior) and (interior)',
    'Vacuuming seats, carpets, and mats',
    'Wipe down of dashboard, console, and door panels',
    'Window cleaning',
  ];
    const service = 'basic-interior';

  return (
    <ServiceDetailPage title={title} price={price} includes={includes} service={service} />
  );
};

export default BasicInteriorPage;
