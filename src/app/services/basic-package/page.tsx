import React from 'react';
import ServiceDetailPage from '../../../components/ServiceDetailPage';

const BasicPackagePage = () => {
  const title = 'Basic Package';
  const price = '$100 (sedan) $155 (suv/truck) $195 (van)';
  const includes = [
    'Hand wash and dry',
    'Wheel and tire cleaning',
    'Window cleaning (exterior) and (interior)',
    'Vacuuming seats, carpets, and mats',
    'Wipe down of dashboard, console, and door panels',
    'Window cleaning',
  ];
  const service = 'basic-package';

  return (
    <ServiceDetailPage title={title} price={price} includes={includes} service={service} />
  );
};

export default BasicPackagePage;
