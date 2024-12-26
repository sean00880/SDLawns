import React from 'react';
import ServiceDetailPage from '../../../components/ServiceDetailPage';

const StandardExteriorPage = () => {
  const title = 'Standard Exterior Detail';
  const price = '$95 (sedan) $140 (suv/truck) $160 (van)';
  const includes = [
    'Foam Cannon, Hand wash, and dry.',
    'Wax application',
    'Tire dressing',
    'Exterior trim dressing',
    'Windows and mirrors',
    'Ceramic Spray Sealant',
    'Detail of rims and tires',
    'Door jamb cleaning',
  ];
    const service = 'standard-exterior';

  return (
    <ServiceDetailPage title={title} price={price} includes={includes} service={service} />
  );
};

export default StandardExteriorPage;
